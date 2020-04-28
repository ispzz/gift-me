<template>
  <div >
    <h1>Plz buy for me <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/237/face-with-pleading-eyes_1f97a.png" alt="plz"> </h1>
    <p>{{name}}</p>
    <p>{{image}}</p>
    <p>{{itemurl}}</p>
  </div>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'show',
    data() {
      return {
          name: "",
          image: "",
          itemurl: ""
    }
  },
  async mounted() {
    const id = this.$route.params.id;
    const wishlistRef = await firebase
        .firestore()
        .collection("accounts")
        .doc(firebase.auth().currentUser.uid)
        .collection("wishlists")
        .doc(id);

    wishlistRef.onSnapshot(snap => {
      snap.forEach(doc => {
        this.name = doc.data().name;
        this.image = doc.data().image;
        this.itemurl = doc.data().itemurl;
      });
    });
  }
  // created() {
  //   this.getGift();
  // },
  // methods: {
  //   async getGift() {
  //     await firebase.firestore().collection("accounts").doc(firebase.auth().currentUser.uid).collection("wishlists").doc(this.$route.params.id).get().then
  //   }
  // }
}
</script>

<style scoped>
</style>
