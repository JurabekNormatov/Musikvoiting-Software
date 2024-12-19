<template>
  <div class="flex-container">
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Titel</th>
          <th>Genre</th>
          <th>Bandname</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Titel1</td>
          <td>Metal</td>
          <td>Metallica</td>
          <td><button @click="" class="">Vote Up</button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>Titel1</td>
          <td>Pop</td>
          <td>Helene Fischer</td>
          <td><button @click="" class="">Vote Up</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'VotingPage',
};
</script>