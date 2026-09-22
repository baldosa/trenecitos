import { ref } from 'vue'

const STORAGE_KEY = 'recentStations'
const MAX_RECENT = 8

function loadRecentStations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Error loading recent stations:', error)
    return []
  }
}

function persistRecentStations(stations) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stations))
  } catch (error) {
    console.error('Error saving recent stations:', error)
  }
}

// Shared, module-level state: every component that imports `recentStations`
// sees the same live list.
export const recentStations = ref(loadRecentStations())

export function recordStation(station) {
  if (!station?.id_estacion) {
    return
  }
  const withoutDuplicate = recentStations.value.filter(
    (entry) => entry.id_estacion !== station.id_estacion
  )
  recentStations.value = [station, ...withoutDuplicate].slice(0, MAX_RECENT)
  persistRecentStations(recentStations.value)
}

export function recordSearch({ desde, hasta }) {
  recordStation(desde)
  recordStation(hasta)
}
