<template>
  <div class="sign-up">
    <p>Let's create a new account!</p>
    <input type="text" v-model="email" placeholder="Email"><br />
    <input type="password" v-model="password" placeholder="password"><br />
    <button @click="signUp">Sign Up!</button><br />
    <span>... or go back to <router-link to="/login">login</router-link></span>
  </div>

</template>

<script>
  import firebase from 'firebase';

  export default {
    name:'signUp',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (userCreate) => {
            // get user data
            const userData = userCreate.user
            const userUID = userData.uid;
            const email = this.email;

            console.log(userUID);
            console.log(email);

            // set up user collection
            const account = {
              useruid: userUID,
              wishlist: {}
            }

            firebase.firestore().collection('accounts').doc(userUID).set(account);

            this.$router.replace('home')
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
</style>
