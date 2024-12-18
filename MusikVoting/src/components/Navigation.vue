<template>
  <div class="flex-container">
  <div class="button-container">
    <div> 
      <button @click="goToGastgeber" class="btn btn-home">Gastgeber</button>
    </div>
    <div>
      <button @click="goToGast"  class="btn btn-home">Gast</button>
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
    goToGast() {
      this.$router.push({ name: 'Gast' });
    },
  },

};
</script>