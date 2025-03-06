import { useRouter } from 'vue-router'

export default function useNavigation() {
  const router = useRouter()

  function goToGastgeber() {
    router.push({ name: 'Gastgeber' })
  }

  function goToGastAnmeldung() {
    router.push({ name: 'GastAnmeldung' })
  }

  return {
    goToGastgeber,
    goToGastAnmeldung,
  }
}
