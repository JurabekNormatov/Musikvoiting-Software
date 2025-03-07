import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default function useVoting() {

  // Deklariert eine reaktive Variable für die Liste der Songs
  const songs = ref([])

  // Deklariert eine reaktive Variable für die Sortierreihenfolge (aufsteigend oder absteigend)
  const sortOrder = ref('desc')

  // Deklariert eine reaktive Variable, um das Anzeigen des Formulars zum Hinzufügen eines Songs zu steuern
  const showAddForm = ref(false)

  // Deklariert ein reaktives Objekt für einen neuen Song, der hinzugefügt werden soll
  const newSong = ref({
    titel: '',
    bandname: '',
    genre: '',
  })

  // Funktion zum Abrufen der Songs von der API
  async function fetchSongs() {
    try {
      const response = await axios.get('http://localhost:3000/api/musikwuensche')
      songs.value = response.data
    } catch (error) {
      console.error('Fehler beim Laden der Songs:', error)
    }
  }

  // Funktion zum Abstimmen eines Songs
  async function voteSong(songId) {
    try {
      const response = await axios.post('http://localhost:3000/api/vote', { songId })
      console.log('Vote erfolgreich:', response.data)
      fetchSongs()
    } catch (error) {
      console.error('Fehler beim Voting:', error)
      alert(error.response?.data?.error || 'Fehler beim Voting.')
    }
  }

  // Funktion zum Hinzufügen eines neuen Songs
  async function addSong() {
    try {
      await axios.post('http://localhost:3000/api/musikwuensche', {
        titel: newSong.value.titel,
        bandname: newSong.value.bandname || null,
        genre: newSong.value.genre,
        votes_count: 0,
      })
      alert('Song erfolgreich hinzugefügt!')
      fetchSongs()
      showAddForm.value = false
      newSong.value = { titel: '', bandname: '', genre: '' }
    } catch (error) {
      console.error('Fehler beim Hinzufügen des Songs:', error)
      alert(error.response?.data || 'Fehler beim Hinzufügen des Songs.')
    }
  }

  // Funktion zum Umschalten des Formulars zum Hinzufügen eines Songs (anzeigen oder ausblenden)
  function toggleAddForm(value) {
    showAddForm.value = value
  }

  // Computed Property zum Sortieren der Songs nach der Anzahl der Stimmen (abhängig von der Sortierreihenfolge)
  const sortedSongs = computed(() => {
    return [...songs.value].sort((a, b) => {
      return sortOrder.value === 'asc' ? a.votes_count - b.votes_count : b.votes_count - a.votes_count
    })
  })

  // Lädt die Songs beim ersten Laden der Komponente
  onMounted(fetchSongs)

  // Gibt alle Funktionen und Variablen zurück, die im Template verwendet werden
  return {
    songs: sortedSongs,
    showAddForm,
    newSong,
    addSong,
    voteSong,
    toggleAddForm,
  }
}
