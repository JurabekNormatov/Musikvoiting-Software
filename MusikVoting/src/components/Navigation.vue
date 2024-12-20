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


<script>

export default {
  name: 'Navigation',
  methods: {
    goToGastgeber() {
      this.$router.push({ name: 'Gastgeber' });
    },
    goToGastAnmeldung() {
      this.$router.push({ name: 'GastAnmeldung' });
    },
  },

};
</script>