import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export default function useVoting() {
  const songs = ref([])
  const sortOrder = ref('desc')
  const showAddForm = ref(false)
  const newSong = ref({
    titel: '',
    bandname: '',
    genre: '',
  })

  async function fetchSongs() {
    try {
      const response = await axios.get('http://localhost:3000/api/musikwuensche')
      songs.value = response.data
    } catch (error) {
      console.error('Fehler beim Laden der Songs:', error)
    }
  }

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

  async function deleteSong(songId) {
    try {
      await axios.delete(`http://localhost:3000/api/musikwuensche/${songId}`)
      console.log('Song erfolgreich gelöscht')
      fetchSongs()
    } catch (error) {
      console.error('Fehler beim Löschen des Songs:', error)
      alert(error.response?.data || 'Fehler beim Löschen des Songs.')
    }
  }

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

  function toggleAddForm(value) {
    showAddForm.value = value
  }

  const sortedSongs = computed(() => {
    return [...songs.value].sort((a, b) => {
      return sortOrder.value === 'asc' ? a.votes_count - b.votes_count : b.votes_count - a.votes_count
    })
  })

  onMounted(fetchSongs)

  return {
    songs: sortedSongs,
    showAddForm,
    newSong,
    addSong,
    voteSong,
    deleteSong,
    toggleAddForm,
  }
}
