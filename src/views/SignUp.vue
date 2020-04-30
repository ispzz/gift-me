<template>
  <!-- <div class="sign-up">
    <p>Let's create a new account!</p>
    <input type="text" v-model="email" placeholder="Email"><br />
    <input type="password" v-model="password" placeholder="password"><br />
    <button @click="signUp">Sign Up!</button><br />
    <span>... or go back to <router-link to="/login">login</router-link></span>
  </div> -->

  <section class="section">
    <div class="box has-text-centered">
      <h1 class="title">Let's create a new account!</h1>
      <b-notification
            v-if="errorsPresent"
            type="is-danger"
            aria-close-label="Close notification"
            role="alert">
            {{errorMessage}}
        </b-notification>

      <b-field label="Display Name">
        <b-input v-model="displayName" placeholder="Tom Nook" rounded></b-input>
      </b-field>

      <b-field label="Email">
        <b-input v-model="email" placeholder="...@gmail.com" rounded></b-input>
      </b-field>

      <b-field label="Password">
        <b-input v-model="password" type="password" placeholder="password" rounded></b-input>
      </b-field>

      <b-button size="is-medium" @click="signUp" type="is-primary" rounded>Create</b-button>
      <p><span>... or go back to <router-link to="/login">login</router-link></span></p>
    </div>
  </section>

</template>

<script>
  import firebase from 'firebase';

  export default {
    name:'signUp',
    data() {
      return {
        email: '',
        password: '',
        displayName: '',
        errorsPresent: false,
        errorMessage: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          () => {
            console.log(firebase.auth().currentUser);
            console.log(this.displayName);

            const user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: this.displayName
            }).then(function() {
              this.$router.replace('wishlist')
            }).catch(function(error) {
              console.log(error);
            });

            // get user data
            // const userData = userCreate.user
            // const userUID = userData.uid;
            // const email = this.email;
            //
            // console.log(userUID);
            // console.log(email);
            //
            // // set up user collection
            // const account = {
            //   useruid: userUID,
            //   wishlist: {}
            // }
            //
            // firebase.firestore().collection('accounts').doc(userUID).set(account);

            // this.$router.replace('wishlist')
          },
          (err) => {
            this.errorsPresent = true;
            this.errorMessage = err.message;
            console.log(err.message);
            // alert('Whoopsies. ' +err.message)
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
