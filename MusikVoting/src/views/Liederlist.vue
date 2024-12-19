<template>
  <div class="flex-container">
    <h2 class="title">Top 5 Lieder mit den meisten Votes</h2>
    <table class="table">
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Liederlist',
  data() {
    return {
      topSongs: [],
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
  },
  mounted() {
    this.fetchTopSongs()
  },
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.title {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.table {
  border-collapse: collapse;
  width: 80%;
  text-align: left;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table tr:hover {
  background-color: #f1f1f1;
}
</style>
