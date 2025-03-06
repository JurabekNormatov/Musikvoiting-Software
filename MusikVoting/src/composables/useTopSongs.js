import { ref, onMounted } from 'vue'
import axios from 'axios'

export default function useTopSongs() {
  const topSongs = ref([])
  const playListName = ref({ name: 'Unbekannt' })

  async function fetchTopSongs() {
    try {
      const response = await axios.get('http://localhost:3000/api/top-songs')
      topSongs.value = response.data
    } catch (error) {
      console.error('Fehler beim Abrufen der Top-Songs:', error)
    }
  }

  async function fetchLastPlaylist() {
    try {
      const response = await axios.get('http://localhost:3000/api/playlist/latest')
      playListName.value = response.data
    } catch (error) {
      console.error('Fehler beim Abrufen der letzten Playlist:', error)
    }
  }

  onMounted(() => {
    fetchTopSongs()
    fetchLastPlaylist()
  })

  return {
    topSongs,
    playListName,
  }
}
