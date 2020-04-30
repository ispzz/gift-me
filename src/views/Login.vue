<template>
  <section class="section">
    <div class="box has-text-centered">
    <h1 class="title">Login</h1>
    <b-field label="Email">
      <b-input v-model="email" placeholder="...@gmail.com" rounded></b-input>
    </b-field>
    <b-field label="Password">
      <b-input v-model="password" type="password" placeholder="password" rounded></b-input>
    </b-field>

    <b-button size="is-medium" @click="login" type="is-primary" rounded>Login</b-button>
    <p>Don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
  </section>

  <!-- <div class="login">
    <h3>Sign In</h3>
    <input type="text" v-model="email" placeholder="Email"><br/>
    <input type="password" v-model="password" placeholder="Password"><br/>
    <button @click="login">Connection</button>
    <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
  </div> -->
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
.section {
  width: 40vw;
  text-align: center;
}
</style>
