<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="vh-100">
    <table class="table border-success">
      <thead>
        <tr>
          <th>#</th>
          <th>Titel</th>
          <th>Genre</th>
          <th>Bandname</th>
          <th>Votes</th>
          <th>Aktionen</th>
          <th>Löschen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in songs" :key="song.song_id">
          <td>{{ index + 1 }}</td>
          <td>{{ song.titel }}</td>
          <td>{{ song.genre }}</td>
          <td>{{ song.bandname }}</td>
          <td>{{ song.votes_count }}</td>
          <td>
            <button @click="voteSong(song.song_id)" class="btn btn-success">Vote Up</button>
          </td>
          <td>
            <button @click="deleteSong(song.song_id)" class="btn btn-success">Delete</button>
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
    }
  },
  computed: {
    songs() {
      return [...this.songs].sort((a, b) => {
        return this.sortOrder === 'asc' ? a.votes_count - b.votes_count : b.votes_count - a.votes_count
      })
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
          gastId: this.currentGastId 
        });
        console.log('Vote erfolgreich:', response.data);
        this.fetchSongs();
      } catch (error) {
        console.error('Fehler beim Voting:', error);
        alert(error.response?.data?.error || 'Fehler beim Voting.');
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
  },

  mounted() {
    this.fetchSongs()
  },
}
</script>

<style scoped></style>
