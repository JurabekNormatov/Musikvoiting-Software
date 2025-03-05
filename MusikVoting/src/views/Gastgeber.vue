<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="boxtopbg"></div>
  <div class="boxmusic"></div>
  <div class="box1">
    <div>
      <input
        v-model="playlistName"
        type="text"
        placeholder="Playlist Name"
        class="formcontrol"
      />
    </div>
    <div class="box2">
      <button @click="handleButtonClick('Add')" class="btn btn-success">Add</button>
      <button @click="goToTop5" class="btn btn-success">Top 5</button>
    </div>
    <div class="box3">
      <button @click="handleButtonClick('Delete')" class="btn btn-success">Delete</button>
    </div>
    <div>
    <HomeLink />
    </div>
  </div>
  <div class="boxbotbg"></div>
</template>
<style>

</style>
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
            this.addPlaylist();
        } else if (action === 'Delete') {
            this.deletePlaylist();
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
    async deletePlaylist() {
        try {
            if (!this.playlistName.trim()) {
                return;
            }

            const checkResponse = await axios.get(`http://localhost:3000/api/playlist/check`, {
                params: { name: this.playlistName.trim(), gastgeberId: 1 },
            });

            if (!checkResponse.data.exists) {
                alert('Diese Playlist existiert nicht');
                return;
            }

            await axios.delete(`http://localhost:3000/api/playlist`, {
                data: { name: this.playlistName.trim(), gastgeberId: 1 },
            });

            alert('Playlist gelöscht');
            this.playlistName = '';
        } catch (error) {
            console.error('Fehler beim Löschen der Playlist', error);
            alert('Löschen der Playlist fehlgeschlagen');
        }
    },
  },
}
</script>
