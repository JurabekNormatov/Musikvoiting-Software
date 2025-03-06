import { ref, onMounted } from 'vue'
import axios from 'axios'

export default function useTopSongs() {

  // Deklariert eine reaktive Variable für die Top-Songs
  const topSongs = ref([])

  // Deklariert eine reaktive Variable für den Namen der Playlist
  const playListName = ref({ name: 'Unbekannt' })

  // Funktion zum Abrufen der Top-Songs von der API
  async function fetchTopSongs() {
    try {
      const response = await axios.get('http://localhost:3000/api/top-songs')
      topSongs.value = response.data
    } catch (error) {
      console.error('Fehler beim Abrufen der Top-Songs:', error)
    }
  }

  // Funktion zum Abrufen der letzten Playlist von der API
  async function fetchLastPlaylist() {
    try {
      const response = await axios.get('http://localhost:3000/api/playlist/latest')
      playListName.value = response.data
    } catch (error) {
      console.error('Fehler beim Abrufen der letzten Playlist:', error)
    }
  }

  // Lädt die Top-Songs und die letzte Playlist beim ersten Laden der Komponente
  onMounted(() => {
    fetchTopSongs()
    fetchLastPlaylist()
  })

  // Gibt die reaktiven Variablen für die Top-Songs und den Playlist-Namen zurück
  return {
    topSongs,
    playListName,
  }
}
