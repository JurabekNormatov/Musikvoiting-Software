<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <div> 
    <input type="text" placeholder="Playlist Name" class="form-control mb-3 shadow-none border-success"/>
    </div>
    <div class="d-flex flex-wrap gap-2 justify-content-center">
      <button @click="handleButtonClick('Add')" class="btn btn-success">Add</button>
      <button @click="handleButtonClick('Delete')" class="btn btn-success">Delete</button>
      <button @click="goToTop5" class="btn btn-success">Top 5</button>
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