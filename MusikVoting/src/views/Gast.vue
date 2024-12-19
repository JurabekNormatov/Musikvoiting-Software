<template>
  <div class="flex-container">
    <div> 
    <input type="text" placeholder="Song Name" class="input-text"/>
    </div>
    <div>
      <button @click="handleButtonClick('Add')" class="btn">Add</button>
      <button @click="handleButtonClick('Delete')" class="btn">Delete</button>
      <button @click="goToVoting" class="btn">Liste der Lieder</button>
      <button @click="goToTop5" class="btn">Top 5</button>
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