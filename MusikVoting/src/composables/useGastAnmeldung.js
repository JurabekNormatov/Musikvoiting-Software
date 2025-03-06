import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default function useGastAnmeldung() {

  // Deklariert ein reaktives Objekt für die Benutzerdaten
  const gast = ref({
    vname: '',
    nname: '',
    password: '',
    oldPassword: '',
    newPassword: '',
  })

  // Deklariert eine reaktive Variable, um das Anzeigen des Passwortänderungsformulars zu steuern
  const showPasswordChangeForm = ref(false)

  // Deklariert eine reaktive Variable für Fehlernachrichten
  const errorMessage = ref('')

  // Holt den Router für Navigation nach der Anmeldung
  const router = useRouter()

  // Funktion zum Absenden des Formulars
  async function submitForm() {
    gast.value.vname = gast.value.vname.trim()
    gast.value.nname = gast.value.nname.trim()

    if (!gast.value.vname || !gast.value.nname || !gast.value.password.trim()) {
      errorMessage.value = 'Vorname, Nachname und Passwort dürfen nicht leer sein.'
      return
    }

    try {
      errorMessage.value = ''
      const response = await axios.post('http://localhost:3000/api/gast', gast.value)
      console.log('Erfolgreich angemeldet:', response.data)
      router.push({ name: 'Gast' })
    } catch (error) {
      errorMessage.value = error.response?.data || 'Ein unbekannter Fehler ist aufgetreten.'
      console.error('Fehler bei der Anmeldung:', error)
    }
  }

  // Funktion zum Ändern des Passworts
  async function changePassword() {
    if (
      !gast.value.vname.trim() ||
      !gast.value.nname.trim() ||
      !gast.value.oldPassword.trim() ||
      !gast.value.newPassword.trim()
    ) {
      errorMessage.value = 'Bitte füllen Sie alle Felder aus.'
      return
    }

    try {
      const response = await axios.post('http://localhost:3000/api/change-password', {
        vname: gast.value.vname.trim(),
        nname: gast.value.nname.trim(),
        oldPassword: gast.value.oldPassword.trim(),
        newPassword: gast.value.newPassword.trim(),
      })

      alert(response.data.message)

      showPasswordChangeForm.value = false
      gast.value.oldPassword = ''
      gast.value.newPassword = ''
    } catch (error) {
      console.error('Fehler beim Ändern des Passworts:', error)
      alert(error.response?.data || 'Passwortänderung fehlgeschlagen.')
    }
  }

  // Funktion zum Umschalten des Passwortänderungsformulars
  function togglePasswordForm() {
    showPasswordChangeForm.value = !showPasswordChangeForm.value
  }

  // Gibt alle Funktionen und Variablen zurück, die im Template verwendet werden
  return {
    gast,
    showPasswordChangeForm,
    errorMessage,
    submitForm,
    changePassword,
    togglePasswordForm,
  }
}
