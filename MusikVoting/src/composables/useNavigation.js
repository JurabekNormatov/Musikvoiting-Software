import { useRouter } from 'vue-router'

export default function useNavigation() {
  // Holt den Router, um Navigation innerhalb der App durchzuführen
  const router = useRouter()

  // Funktion zur Navigation zur 'Gastgeber'-Seite
  function goToGastgeber() {
    router.push({ name: 'Gastgeber' })
  }

  // Funktion zur Navigation zur 'GastAnmeldung'-Seite
  function goToGastAnmeldung() {
    router.push({ name: 'GastAnmeldung' })
  }

  // Gibt die Funktionen für die Navigation zurück, damit sie im Template verwendet werden können
  return {
    goToGastgeber,
    goToGastAnmeldung,
  }
}
