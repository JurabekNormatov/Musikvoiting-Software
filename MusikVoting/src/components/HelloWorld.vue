<template>
  <div>
    <button @click="handleButtonClick('Button 1')" class="btn">Button 1</button>
    <button @click="handleButtonClick('Button 2')" class="btn">Button 2</button>
  </div>
</template>

<script>
export default {
  name: 'TwoButtons',
  methods: {
    handleButtonClick(buttonName) {
      alert(`${buttonName} wurde geklickt!`)
    },
  },
}
</script>

<style scoped>
.btn {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
}

.btn:hover {
  background-color: #45a049;
}
</style>
