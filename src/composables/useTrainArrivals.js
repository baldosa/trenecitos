import client from '@/api'

// Shared by TrenesView.vue (search results screen) and RamalView.vue
// (auto-loaded trains for a ramal) — both need the exact same
// GET /v1/arribos/estacion/{id} call, just with different desde/hasta.
export async function fetchTrainArrivals({ desde, hasta, tipoBusqueda, fecha, hora } = {}) {
  const { data } = await client.GET('/v1/arribos/estacion/{id}', {
    params: {
      path: { id: parseInt(desde) },
      query: { hasta: parseInt(hasta), tipoBusqueda, fecha, hora }
    }
  })
  return data
}
