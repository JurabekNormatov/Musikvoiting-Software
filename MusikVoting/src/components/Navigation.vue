<script setup>
import useNavigation from '../composables/useNavigation.js'

const { goToGastgeber, goToGastAnmeldung } = useNavigation()
</script>

<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div>
      <div class="mb-3">
        <button @click="goToGastgeber" class="btn btn-success w-100">Gastgeber</button>
      </div>
      <div>
        <button @click="goToGastAnmeldung" class="btn btn-success w-100">Gast</button>
      </div>
    </div>
  </div>
</template>