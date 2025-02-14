<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="vh-100">
    <button @click="showAddForm = true" class="btn btn-success mb-3">
      Neues Lied Hinzufügen +
    </button>

    <div v-if="showAddForm" class="mb-3 border p-3">
      <h3>Neues Lied Hinzufügen</h3>
      <input v-model="newSong.titel" placeholder="Titel" class="form-control mb-2" />
      <input v-model="newSong.bandname" placeholder="Bandname" class="form-control mb-2" />
      <select v-model="newSong.genre" class="form-control mb-2">
        <option value="">Genre wählen</option>
        <option value="Rock">Rock</option>
        <option value="Pop">Pop</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Klassik">Klassik</option>
        <option value="Unbekannt">Unbekannt</option>
      </select>
      <button @click="addSong" class="btn btn-success">Hinzufügen</button>
      <button @click="showAddForm = false" class="btn btn-secondary ml-2">Abbrechen</button>
    </div>
    <table class="table border-success">
      <thead>
        <tr>
          <th>#</th>
          <th>Titel</th>
          <th>Genre</th>
          <th>Bandname</th>
          <th>Votes</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in songs" :key="song.song_id">
          <td>{{ index + 1 }}</td>
          <td>{{ song.titel }}</td>
          <td>{{ song.genre }}</td>
          <td>{{ song.bandname || 'Unbekannt' }}</td>
          <td>{{ song.votes_count }}</td>
          <td>
            <button @click="voteSong(song.song_id)" class="btn btn-success">Vote Up</button>
          </td>
        </tr>
      </tbody>
    </table>
    <HomeLink />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VotingPage',
  data() {
    return {
      songs: [],
      sortOrder: 'desc',
      showAddForm: false,
      newSong: {
        titel: '',
        bandname: '',
        genre: '',
      },
    }
  },
  methods: {
    async fetchSongs() {
      try {
        const response = await axios.get('http://localhost:3000/api/musikwuensche')
        this.songs = response.data
      } catch (error) {
        console.error('Fehler beim Laden der Songs:', error)
      }
    },

    async voteSong(songId) {
      try {
        const response = await axios.post('http://localhost:3000/api/vote', {
          songId,
          gastId: this.currentGastId,
        })
        console.log('Vote erfolgreich:', response.data)
        this.fetchSongs()
      } catch (error) {
        console.error('Fehler beim Voting:', error)
        alert(error.response?.data?.error || 'Fehler beim Voting.')
      }
    },

    async deleteSong(songId) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/musikwuensche/${songId}`)
        console.log('Song erfolgreich gelöscht:', response.data)
        this.fetchSongs()
      } catch (error) {
        console.error('Fehler beim Löschen des Songs:', error)
        alert(error.response?.data || 'Fehler beim Löschen des Songs.')
      }
    },

    async addSong() {
      try {
        await axios.post('http://localhost:3000/api/musikwuensche', {
          titel: this.newSong.titel,
          bandname: this.newSong.bandname || null,
          genre: this.newSong.genre,
          votes_count: 0,
        })
        alert('Song erfolgreich hinzugefügt!')
        this.fetchSongs()
        this.showAddForm = false
        this.newSong = { titel: '', bandname: '', genre: '' }
      } catch (error) {
        console.error('Fehler beim Hinzufügen des Songs:', error)
        alert(error.response?.data || 'Fehler beim Hinzufügen des Songs.')
      }
    },
  },

  songs() {
    return [...this.songs].sort((a, b) => {
      return this.sortOrder === 'asc'
        ? a.votes_count - b.votes_count
        : b.votes_count - a.votes_count
    })
  },

  mounted() {
    this.fetchSongs()
  },
}
</script>

<style scoped></style>
