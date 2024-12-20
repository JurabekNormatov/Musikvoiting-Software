<script setup>
  import HomeLink from '../components/HomeLink.vue'
</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div class="p-4" style="width: 400px;">
      <div class="mb-4">
        <input type="text" placeholder="Titel" class="form-control mb-3 shadow-none border-success" />
        <input type="text" placeholder="Genre" class="form-control mb-3 shadow-none border-success" />
        <input type="text" placeholder="Bandname" class="form-control shadow-none border-success" />
      </div>

      <div class="d-flex flex-wrap gap-2 justify-content-center">
        <button @click="handleButtonClick('Add')" class="btn btn-success">Add</button>
        <button @click="handleButtonClick('Delete')" class="btn btn-success">Delete</button>
        <button @click="goToVoting" class="btn btn-success">Liste der Lieder</button>
        <button @click="goToTop5" class="btn btn-success">Top 5</button>
      </div>
      <HomeLink />
    </div>

  </div>
</template>


<script>
import { handleButtonClick } from '@/utils/buttonHandlers';


export default {
  name: 'Gast',
  methods: {
    handleButtonClick,
    goToTop5() {
      this.$router.push({ name: 'Liederlist' });
    },
    goToVoting() {
      this.$router.push({ name: 'VotingPage' });
    },
  },
};
</script>