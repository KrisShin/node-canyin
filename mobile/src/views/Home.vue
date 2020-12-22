<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Login />
  </div>
</template>

<script>
import Login from '@/views/Login.vue'

export default {
  name: 'Home',
  components: {
    Login
  }
}
</script>
