<script setup>
import HomeLink from '../components/HomeLink.vue'
import useGastAnmeldung from '../composables/useGastAnmeldung.js'

const {
  gast,
  showPasswordChangeForm,
  errorMessage,
  submitForm,
  changePassword,
} = useGastAnmeldung()
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100 flex-column">
    <div class="card p-4 border-success w-25">
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

        <a href="#" @click.prevent="showPasswordChangeForm = true" class="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
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
          class="btn btn-success w-100 mt-2"
        >
          Zurück zur Anmeldung
        </button>
      </form>
    </div>
  <HomeLink />
  </div>
</template>