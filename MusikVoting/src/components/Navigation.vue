<template>
  <div class="boxtopbg"></div>
  <div class="boxmusic">
    <div class="box5">
        <button @click="goToGastgeber" class="btn btn-success">Gastgeber</button>
        <button @click="goToGastAnmeldung" class="btn btn-success">Gast</button>
  </div>
  </div>
  <div class="box1">
    
</div>
  
  <div class="boxbotbg"></div>
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