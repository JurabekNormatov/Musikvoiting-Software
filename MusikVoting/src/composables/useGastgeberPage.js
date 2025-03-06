import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function usePlaylist() {

  // Deklariert eine reaktive Variable für den Namen der Playlist
  const playlistName = ref('')

  // Holt den Router für Navigation zu anderen Seiten
  const router = useRouter()

  // Funktion zur Navigation zur "Liederlist"-Seite
  const goToTop5 = () => {
    router.push({ name: 'Liederlist' })
  }

  // Funktion zur Verarbeitung von Button-Klicks (Add oder Delete)
  const handleButtonClick = (action) => {
    if (action === 'Add') {
      addPlaylist()
    } else if (action === 'Delete') {
      deletePlaylist()
    }
  }

  // Funktion zum Hinzufügen einer neuen Playlist
  const addPlaylist = async () => {
    try {
      if (!playlistName.value.trim()) {
        return
      }

      const checkResponse = await axios.get(`http://localhost:3000/api/playlist/check`, {
        params: { name: playlistName.value.trim(), gastgeberId: 1 },
      })

      if (checkResponse.data.exists) {
        alert('Diese Playlist existiert bereits')
        return
      }

      await axios.post('http://localhost:3000/api/playlist', {
        name: playlistName.value.trim(),
        gastgeberId: 1,
      })

      alert('Playlist hinzugefügt')
      playlistName.value = ''
    } catch (error) {
      console.error('Fehler beim Hinzufügen einer Playlist', error)
      alert('Hinzufügen einer Playlist fehlgeschlagen')
    }
  }

  // Funktion zum Löschen einer Playlist
  const deletePlaylist = async () => {
    try {
      if (!playlistName.value.trim()) {
        return
      }

      const checkResponse = await axios.get(`http://localhost:3000/api/playlist/check`, {
        params: { name: playlistName.value.trim(), gastgeberId: 1 },
      })

      if (!checkResponse.data.exists) {
        alert('Diese Playlist existiert nicht')
        return
      }

      await axios.delete(`http://localhost:3000/api/playlist`, {
        data: { name: playlistName.value.trim(), gastgeberId: 1 },
      })

      alert('Playlist gelöscht')
      playlistName.value = ''
    } catch (error) {
      console.error('Fehler beim Löschen der Playlist', error)
      alert('Löschen der Playlist fehlgeschlagen')
    }
  }

  // Gibt alle Funktionen und Variablen zurück, die im Template verwendet werden
  return { playlistName, goToTop5, handleButtonClick }
}
