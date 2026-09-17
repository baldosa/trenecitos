import createClient from 'openapi-fetch'
import { API_BASE_URL } from '@/api/config'
import { genUser, genPasswd, isTokenExpired, getToken, storeToken } from '@/helpers'

// A separate client with no middleware, used only for the login call
// itself. src/api/index.ts's main client attaches auth via a middleware
// that calls ensureToken() below — reusing that same client here would
// recurse back into this module on every login attempt.
const authClient = createClient({ baseUrl: API_BASE_URL })

async function requestNewToken() {
  const user = genUser()
  const passwd = genPasswd(user)
  const { data, error } = await authClient.POST('/v1/auth/authorize', {
    body: { username: user, password: passwd }
  })
  if (error || !data?.token) {
    throw new Error('No se pudo iniciar sesión')
  }
  storeToken(data.token)
  return data.token
}

// A stored token can be missing, expired, or (rarely) corrupted in a way
// that makes isTokenExpired() itself throw — any of those means "get a
// fresh one", not "crash".
function tokenIsUsable(token) {
  if (!token) return false
  try {
    return !isTokenExpired(token)
  } catch {
    return false
  }
}

// Dedupe concurrent callers: a burst of requests at startup, or right
// after the token expires, should trigger a single login POST, not one
// per request.
let pendingLogin = null

export function ensureToken() {
  const existing = getToken()
  if (tokenIsUsable(existing)) {
    return Promise.resolve(existing)
  }
  if (!pendingLogin) {
    pendingLogin = requestNewToken().finally(() => {
      pendingLogin = null
    })
  }
  return pendingLogin
}
