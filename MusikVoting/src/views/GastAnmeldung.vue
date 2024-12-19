<template>
  <div class="flex-container">
      <form class="flex-container">
            <input type="text" placeholder="Geben Sie bitte Ihren Namen ein" class="input-text"/>
            <button @click="goToGast" class="btn registration-button">Anmelden</button>
      </form>
  </div>
</template>

<script>

export default {
  name: 'GastAnmeldung',
  methods: {
    goToGast() {
      this.$router.push({ name: 'Gast' });
    },
  },
};
</script>