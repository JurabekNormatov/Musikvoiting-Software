<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div>
      <input
        v-model="playlistName"
        type="text"
        placeholder="Playlist Name"
        class="form-control mb-3 shadow-none border-success"
      />
    </div>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <button @click="handleButtonClick('Add')" class="btn btn-success">Add</button>
      <button @click="handleButtonClick('Delete')" class="btn btn-success">Delete</button>
      <button @click="goToTop5" class="btn btn-success">Top 5</button>
    </div>
    <HomeLink />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Gastgeber',
  data() {
    return {
      playlistName: '',
    }
  },
  methods: {
    goToTop5() {
      this.$router.push({ name: 'Liederlist' })
    },
    handleButtonClick(action) {
      if (action === 'Add') {
        this.addPlaylist()
      }
    },
    async addPlaylist() {
      try {
        if (!this.playlistName.trim()) {
          return
        }

        const checkResponse = await axios.get(`http://localhost:3000/api/playlist/check`, {
          params: { name: this.playlistName.trim(), gastgeberId: 1 },
        })

        if (checkResponse.data.exists) {
          alert('Diese Playlist existiert bereits')
          return
        }

        await axios.post('http://localhost:3000/api/playlist', {
          name: this.playlistName.trim(),
          gastgeberId: 1,
        })

        alert('Playlist hinzugefügt')
        this.playlistName = ''
      } catch (error) {
        console.error('Fehler beim Hinzufügen einer Playlist', error)
        alert('Hinzufügen einer Playlist fehlgeschlagen')
      }
    },
  },
}
</script>
