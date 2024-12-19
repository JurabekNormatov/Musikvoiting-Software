<template>
  <div class="flex-container">
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <form @submit.prevent="submitForm" class="form-container">
      <h2 class="form-title">Gast Anmeldung</h2>
      <div class="input-group">
        <input type="text" v-model="gast.vname" placeholder="Vorname" class="input-field" />
      </div>
      <div class="input-group">
        <input type="text" v-model="gast.nname" placeholder="Nachname" class="input-field" />
      </div>
      <button type="submit" class="btn submit-button">Anmelden</button>
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

<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-title {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.input-field {
  width: 100%;
  max-width: 360px; /* Max width of the input field */
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: #f7f7f7;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #4caf50;
  background-color: #ffffff;
}

.submit-button {
  width: 100%;
  max-width: 360px;
  padding: 12px 15px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

.error-message {
  background-color: #ffe6e6;
  color: #cc0000;
  padding: 10px 15px;
  border: 1px solid #cc0000;
  border-radius: 5px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
