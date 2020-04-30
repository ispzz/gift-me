<template>
  <div class="home">
    <h1>welcome</h1>
    <b-button type="is-primary" @click="logout">Logout</b-button>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'home',
    components: {},
    methods: {
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>

<style scoped>
</style>
