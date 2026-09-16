// Maps a línea's nombre (from GET /v1/infraestructura/gerencias) to a
// real-world brand color. The API does not provide a brand color for
// líneas (only a status color under `estado`), so this is a client-side
// lookup table. Falls back to the primary brand blue for anything not
// recognized.
const LINE_COLORS = [
  { match: 'mitre', color: '#16835b' },
  { match: 'san martin', color: '#7c3aed' },
  { match: 'sarmiento', color: '#1769aa' },
  { match: 'roca', color: '#0d9488' },
  { match: 'belgrano norte', color: '#dc2626' },
  { match: 'belgrano sur', color: '#f2a900' },
  { match: 'urquiza', color: '#ca8a04' }
]

const DEFAULT_COLOR = '#1769aa'

function normalize(nombre) {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip accents so "san martín" matches "san martin"
}

export function lineColor(nombre) {
  if (!nombre) return DEFAULT_COLOR
  const normalized = normalize(nombre)
  const found = LINE_COLORS.find((entry) => normalized.includes(entry.match))
  return found ? found.color : DEFAULT_COLOR
}
