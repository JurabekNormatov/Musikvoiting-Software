<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>              

<template>
  <div class="boxtopbg"></div>
  <div class="boxmusic">
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
  </div>
  <div class="box1">
    <div>
      <input
        v-model="playlistName"
        type="text"
        placeholder="Add a Songname, Bandname, Genres"
        class="formcontrol"
      />
    </div>
    <div class="box2">
      <button @click="handleButtonClick('Add')" class="btn btn-success">Add</button>
      <button @click="goToTop5" class="btn btn-success">Top 5</button>
    </div>
    <div class="box3">
      <button @click="handleButtonClick('Delete')" class="btn btn-success">Delete</button>
      <button @click="VoteUp" class="btn btn-success">VoteUp</button>
    </div>
    <div>
    <HomeLink />
    </div>
  </div>
  <div class="boxbotbg"></div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VotingPage',
  data() {
    return {
      songs: [],
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
        const response = await axios.post('http://localhost:3000/api/vote', { songId })
        console.log('Vote erfolgreich:', response.data)
        this.fetchSongs()
      } catch (error) {
        console.error('Fehler beim Voting:', error)
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

