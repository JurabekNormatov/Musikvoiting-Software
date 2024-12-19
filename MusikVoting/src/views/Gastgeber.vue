<template>
  <div class="flex-container width-20">
    <div> 
    <input type="text" placeholder="Playlist Name" class="input-text"/>
    </div>
    <div>
      <button @click="handleButtonClick('Add')" class="btn">Add</button>
      <button @click="handleButtonClick('Delete')" class="btn">Delete</button>
      <button @click="goToTop5" class="btn">Top 5</button>
    </div>
  </div>
</template>

<script>
import { handleButtonClick } from '@/utils/buttonHandlers';


export default {
  name: 'Gastgeber',
  methods: {
    handleButtonClick,
    goToTop5() {
      this.$router.push({ name: 'Liederlist' });
    },
  },
}
</script>