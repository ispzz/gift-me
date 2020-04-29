<template>
  <form action="#" @submit.prevent="updateWish">
    <h1>edit</h1>
    <div class="ui labeled input fluid">
      <div class="ui label">Name:</div>
      <input type="text" placeholder="what do you want bby grl?" v-model="wishlist.name"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Photo URL thnx:</div>
      <input type="text" placeholder="ty" v-model="wishlist.image"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Buy it Link</div>
      <input type="text" placeholder="give us that link bb" v-model="wishlist.itemurl"/>
    </div>
    <button class="positive ui button">Submit</button>
    <router-link to="/wishlist">Cancel</router-link>
  </form>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'show',
    data() {
      return {
        wishlist: {
          name: "",
          image: "",
          itemurl: ""
        }
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
      },
      updateWish() {
        const id = this.$route.params.id;
        firebase
          .firestore()
          .collection("accounts")
          .doc(firebase.auth().currentUser.uid)
          .collection("wishlists")
          .doc(id)
          .update({
            name: this.wishlist.name,
            image: this.wishlist.image,
            itemurl: this.wishlist.itemurl
          }).then(() => {
            this.$router.push({ name: 'show', params: { id: this.$route.params.id } });
          })
      }
    }
  }
</script>

<style scoped>
</style>
