<template>
<div class="wrapper">
  <h1 class="title">I would love this ...</h1>
  <h4 class="title is-4">{{wishlist.name}}</h4>
  <img :src="wishlist.image" />
</div>

  <!-- <div >
    <h1>Plz buy for me <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/face-with-pleading-eyes_1f97a.png" alt="plz"> </h1>
    <p>{{wishlist.name}}</p>
    <img :src="wishlist.image" />
    <p>{{wishlist.itemurl}}</p>
    <router-link :to="{ name: 'edit', params: { id: this.$route.params.id }}">
        Edit word
      </router-link>
  </div> -->
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
            console.log(snap.data());
            console.log(snap.data().name);
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
