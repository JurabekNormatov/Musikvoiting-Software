<script setup>
import HomeLink from '../components/HomeLink.vue'
import useVoting from '../composables/useGastPage.js'

const {
  songs,
  showAddForm,
  newSong,
  addSong,
  voteSong,
} = useVoting()
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
          <th class="text-center">#</th>
          <th class="text-center">Titel</th>
          <th class="text-center">Genre</th>
          <th class="text-center">Bandname</th>
          <th class="text-center">Votes</th>
          <th class="text-center">Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(song, index) in songs" :key="song.song_id">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ song.titel }}</td>
          <td class="text-center">{{ song.genre }}</td>
          <td class="text-center">{{ song.bandname || 'Unbekannt' }}</td>
          <td class="text-center">{{ song.votes_count }}</td>
          <td class="text-center">
            <button @click="voteSong(song.song_id)" class="btn btn-success">Vote Up</button>
          </td>
        </tr>
      </tbody>
    </table>
    <HomeLink />
  </div>
</template>