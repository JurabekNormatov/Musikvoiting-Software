<template>
  <div class="flex-container">
    <form @submit.prevent="submitForm" class="flex-container">
      <input
        type="text"
        v-model="gast.vname"
        placeholder="Geben Sie bitte Ihren Vornamen ein"
        class="input-text"
      />
      <input
        type="text"
        v-model="gast.nname"
        placeholder="Geben Sie bitte Ihren Nachnamen ein"
        class="input-text"
      />
      <button type="submit" class="btn registration-button">Anmelden</button>
    </form>
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
      },
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('http://localhost:3000/api/gast', this.gast)
        console.log('Erfolgreich angemeldet:', response.data)

        this.$router.push({ name: 'Gast' })
      } catch (error) {
        console.error('Fehler bei der Anmeldung:', error)
      }
    },
  },
}
</script>

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-text {
  margin: 10px;
  padding: 10px;
  width: 300px;
}

.registration-button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

.registration-button:hover {
  background-color: #45a049;
}
</style>
