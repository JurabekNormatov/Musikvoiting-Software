<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="vh-100">
    <h2 class="text-center">Top 5 Lieder mit den meisten Votes</h2>
    <h3 class="text-center">Playlistname: {{ playListName.name }}</h3>
    <table class="table border-success">
      <thead>
        <tr>
          <th>#</th>
          <th>Titel</th>
          <th>Genre</th>
          <th>Bandname</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in topSongs" :key="song.song_id">
          <td>{{ index + 1 }}</td>
          <td>{{ song.titel }}</td>
          <td>{{ song.genre }}</td>
          <td>{{ song.bandname }}</td>
          <td>{{ song.votes_count }}</td>
        </tr>
      </tbody>
    </table>
    <HomeLink />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Liederlist',
  data() {
    return {
      topSongs: [],
      playListName: '',
    }
  },
  methods: {
    async fetchTopSongs() {
      try {
        const response = await axios.get('http://localhost:3000/api/top-songs')
        this.topSongs = response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der Top-Songs:', error)
      }
    },

    async fetchLastPLaylist() {
      try {
        const response = await axios.get('http://localhost:3000/api/playlist/latest')
        this.playListName = response.data
      } catch (error) {
        console.error('Fehler beim Abrufen der letzten Playlist:', error)
      }
    },
  },
  mounted() {
    this.fetchTopSongs()
    this.fetchLastPLaylist()
  },
}
</script>
