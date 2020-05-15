<template>
  <div class="wrapper">
    <h1 class="title">Something I would love !</h1>
    <h4 class="title is-4">{{wishlist.name}}</h4>
    <img :src="wishlist.image" />
  </div>
</template>

<script>
  import firebase from "firebase";
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
</style>
