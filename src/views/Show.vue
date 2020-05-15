<template>
  <div class="wrapper">
    <img :src="wishlist.image" />

    <div class="card">
  <header class="card-header">
    <p class="card-header-title is-centered">
      {{wishlist.name}}
    </p>
  </header>
  <div class="card-content">
    <div class="content">
      I would really love this item !
    </div>
  </div>
</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/functions';
  export default {
    name: 'show',
    data() {
      return {
        wishlist: {}
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$route" : "fetchData"
  },
  methods: {
    async fetchData() {
      const id = this.$route.params.id;
      await firebase
          .firestore()
          .collection("accounts")
          .doc(firebase.auth().currentUser.uid)
          .collection("wishlists")
          .doc(id)
          .onSnapshot(snap => {
            this.wishlist = {
              name: snap.data().name,
              image: snap.data().image,
              itemurl: snap.data().itemurl
            };
          });
    }
  }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
img {
  max-height: 50vh;
  border-radius: 1em;
}
h4 {
  margin-top: 1em;
}
.card {
  margin: 2em;
}
</style>
