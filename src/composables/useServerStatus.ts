import { onMounted, onUnmounted, ref } from 'vue'

const SERVER_ADDRESS = 'play.keykey.fr:26001'
const STATUS_API = `https://api.mcsrvstat.us/3/${SERVER_ADDRESS}`
const POLL_INTERVAL_MS = 60_000

interface ServerStatus {
  online: boolean
  playersOnline: number
  playersMax: number
}

export function useServerStatus() {
  const status = ref<ServerStatus | null>(null)
  const loading = ref(true)

  let timer: ReturnType<typeof setInterval> | undefined

  async function fetchStatus() {
    try {
      const res = await fetch(STATUS_API)
      const data = await res.json()
      status.value = {
        online: Boolean(data.online),
        playersOnline: data.players?.online ?? 0,
        playersMax: data.players?.max ?? 0,
      }
    } catch {
      status.value = null
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchStatus()
    timer = setInterval(fetchStatus, POLL_INTERVAL_MS)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  return { status, loading }
}
