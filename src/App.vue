<template>
  <div class="container mt-3">
      <UsersList/>
  </div>
</template>

<script>
import UsersList from './components/UsersList.vue';

export default {
  name: 'App',
  components:{ 
    UsersList,
  },
  data() {
    return {}
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
