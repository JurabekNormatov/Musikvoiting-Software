<template>
  <div class="flex-container">
    <div> 
    <input type="text" placeholder="Playlist Name" class="input-text"/>
    </div>
    <div>
      <button @click="handleButtonClick('Add')" class="btn">Add</button>
      <button @click="handleButtonClick('Login')" class="btn">Login</button>
      <button @click="handleButtonClick('Delete')" class="btn">Delete</button>
      <button @click="handleButtonClick('New Playlist')" class="btn">New Playlist</button>
      <button @click="handleButtonClick('Filter')" class="btn">Filter</button>
    </div>
  </div>
</template>

<script>
import { handleButtonClick } from '@/utils/buttonHandlers';


export default {
  name: 'Gastgeber',
  methods: {
    handleButtonClick,
  },
}
</script>