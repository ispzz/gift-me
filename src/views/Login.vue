<template>
  <div class="centeredContainer">
    <section class="section">
      <form  @submit.prevent="login">
        <div class="box has-text-centered">
        <h1 class="title">Login</h1>
        <b-field label="Email">
          <b-input v-model="email" placeholder="...@gmail.com" rounded></b-input>
        </b-field>
        <b-field label="Password">
          <b-input v-model="password" type="password" placeholder="password" rounded></b-input>
        </b-field>

        <b-button size="is-medium" native-type="submit" type="is-primary" rounded>Login</b-button>
        <p>Don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          () => {
            this.$router.replace('wishlist')
          },
          (err) => {
            alert('Whoopsies. ' +err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>
.centeredContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
