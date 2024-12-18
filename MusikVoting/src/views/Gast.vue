<template>
  <div class="flex-container">
    <div> 
    <input type="text" placeholder="Playlist Name" class="input-text"/>
    </div>
    <div>
      <button @click="handleButtonClick('Add')" class="btn">Add</button>
      <button @click="handleButtonClick('Login')" class="btn">Login</button>
      <button @click="handleButtonClick('Delete')" class="btn">Delete</button>
      <button @click="handleButtonClick('Vote UP')" class="btn">Vote UP</button>
      <button @click="handleButtonClick('Top 5')" class="btn">Top 5</button>
    </div>
  </div>
</template>

<script>
import { handleButtonClick } from '@/utils/buttonHandlers';


export default {
  name: 'Gast',
  methods: {
    handleButtonClick,
  },
};
</script>