<template>
  <div class="d-flex justify-content-center align-items-center vh-100 flex-column">
    <div class="card p-4 shadow-lg" style="width: 400px">
      <p v-if="errorMessage" class="text-danger text-center mb-3">{{ errorMessage }}</p>

      <form v-if="!showPasswordChangeForm" @submit.prevent="submitForm">
        <h2 class="form-title text-center mb-4">Gast Anmeldung</h2>

        <div class="mb-3">
          <input
            type="text"
            v-model="gast.vname"
            placeholder="Vorname"
            class="form-control custom-input shadow-none border-success"
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

        <div class="mb-3">
          <input
            type="password"
            v-model="gast.password"
            placeholder="Kennwort"
            class="form-control custom-input shadow-none border-success"
          />
        </div>

        <a href="#" @click.prevent="showPasswordChangeForm = true" class="text-primary">
          Passwort ändern
        </a>

        <button type="submit" class="btn btn-success w-100 mt-3">Anmelden</button>
      </form>

      <!-- Passwort ändern Formular -->
      <form v-if="showPasswordChangeForm" @submit.prevent="changePassword">
        <h2 class="form-title text-center mb-4">Passwort ändern</h2>

        <div class="mb-3">
          <input
            type="text"
            v-model="gast.vname"
            placeholder="Vorname"
            class="form-control custom-input shadow-none border-success"
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

        <div class="mb-3">
          <input
            type="password"
            v-model="gast.oldPassword"
            placeholder="Altes Kennwort"
            class="form-control custom-input shadow-none border-success"
          />
        </div>

        <div class="mb-3">
          <input
            type="password"
            v-model="gast.newPassword"
            placeholder="Neues Kennwort"
            class="form-control custom-input shadow-none border-success"
          />
        </div>

        <button type="submit" class="btn btn-success w-100 mt-2">Passwort speichern</button>
        <button
          type="button"
          @click="showPasswordChangeForm = false"
          class="btn btn-secondary w-100 mt-2"
        >
          Zurück zur Anmeldung
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GastAnmeldung',
  data() {
    return {
      gast: {
        vname: '',
        nname: '',
        password: '',
        oldPassword: '',
        newPassword: '',
      },
      showPasswordChangeForm: false,
      errorMessage: '',
    }
  },
  methods: {
    async submitForm() {
      this.gast.vname = this.gast.vname.trim()
      this.gast.nname = this.gast.nname.trim()

      if (!this.gast.vname || !this.gast.nname || !this.gast.password.trim()) {
        this.errorMessage = 'Vorname, Nachname und Passwort dürfen nicht leer sein.'
        return
      }

      try {
        this.errorMessage = ''
        const response = await axios.post('http://localhost:3000/api/gast', this.gast)
        console.log('Erfolgreich angemeldet:', response.data)
        this.$router.push({ name: 'Gast' })
      } catch (error) {
        this.errorMessage = error.response?.data || 'Ein unbekannter Fehler ist aufgetreten.'
        console.error('Fehler bei der Anmeldung:', error)
      }
    },

    async changePassword() {
      if (
        !this.gast.vname.trim() ||
        !this.gast.nname.trim() ||
        !this.gast.oldPassword.trim() ||
        !this.gast.newPassword.trim()
      ) {
        this.errorMessage = 'Bitte füllen Sie alle Felder aus.'
        return
      }

      try {
        const response = await axios.post('http://localhost:3000/api/change-password', {
          vname: this.gast.vname.trim(),
          nname: this.gast.nname.trim(),
          oldPassword: this.gast.oldPassword.trim(),
          newPassword: this.gast.newPassword.trim(),
        })

        alert(response.data.message)

        this.showPasswordChangeForm = false
        this.gast.oldPassword = ''
        this.gast.newPassword = ''
      } catch (error) {
        console.error('Fehler beim Ändern des Passworts:', error)
        alert(error.response?.data || 'Passwortänderung fehlgeschlagen.')
      }
    },
  },
}
</script>
