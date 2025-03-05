<script setup>
import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="boxtopbg"></div>
  <div class="boxmusic"></div>
  <div class="box1">
      <p v-if="errorMessage" class="text-danger text-center mb-3">{{ errorMessage }}</p>

      <form @submit.prevent="submitForm">
        <h2 >Gast Anmeldung</h2>

        <div class="mb-3">
          <input
            type="text"
            v-model="gast.vname"
            placeholder="Vorname"
            class="formcontrol"
          />
        </div>

        <div class="mb-3">
          <input
            type="text"
            v-model="gast.nname"
            placeholder="Nachname"
            class="form-control custom-input shadow-none border-success"
          />
        </div>

        <button type="submit" class="btn btn-success w-100">Anmelden</button>
      </form>
      <HomeLink />
    </div>
  
  <div class="boxbotbg"></div>
</template>
<style>
</style>

<script>
import axios from 'axios'

export default {
  name: 'GastAnmeldung',
  data() {
    return {
      gast: {
        vname: '',
        nname: '',
      },
      errorMessage: '',
    }
  },
  methods: {
    async submitForm() {
      this.gast.vname = this.gast.vname.trim()
      this.gast.nname = this.gast.nname.trim()

      if (!this.gast.vname || !this.gast.nname) {
        this.errorMessage = 'Vorname und Nachname dürfen nicht leer sein.'
        return
      }

      try {
        this.errorMessage = ''
        const response = await axios.post('http://localhost:3000/api/gast', this.gast)
        console.log('Erfolgreich angemeldet:', response.data)

        this.$router.push({ name: 'Gast' })
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data
        } else {
          this.errorMessage = 'Ein unbekannter Fehler ist aufgetreten.'
        }
        console.error('Fehler bei der Anmeldung:', error)
      }
    },
  },
}
</script>