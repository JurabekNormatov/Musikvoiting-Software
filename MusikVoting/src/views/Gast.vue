<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>              

<template>
  <div class="d-flex justify-content-start flex-column vh-100 position-relative">
    <button @click="showAddForm = true" class="btn btn-success mb-5 mt-5 d-flex mx-auto w-25 justify-content-center ">
      Neues Lied Hinzufügen +
    </button>

    <div v-if="showAddForm" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content p-4">
          <div class="modal-header d-flex justify-content-center">
            <h2 class="modal-title">Neues Lied Hinzufügen</h2>
          </div>
          <div class="modal-body">
            <input v-model="newSong.titel" placeholder="Titel" class="form-control mb-2 custom-input shadow-none border-success" />
            <input v-model="newSong.bandname" placeholder="Bandname" class="form-control mb-2 custom-input shadow-none border-success" />
            <select v-model="newSong.genre" class="form-control custom-input shadow-none border-success">
              <option value="">Genre wählen</option>
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Hip-Hop">Hip-Hop</option>
              <option value="Klassik">Klassik</option>
              <option value="Unbekannt">Unbekannt</option>
            </select>
          </div>
          <div class="modal-footer d-flex justify-content-center">
            <button @click="addSong" class="btn btn-success">Hinzufügen</button>
            <button @click="showAddForm = false" class="btn btn-success">Abbrechen</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddForm" class="modal-backdrop fade show"></div>

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
      sortOrder: 'desc',
      showAddForm: false,
      newSong: {
        titel: '',
        bandname: '',
        genre: '',
      },
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


