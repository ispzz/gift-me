<template>
  <form action="#" @submit.prevent="addGift">
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
    <router-link to="/">Cancel</router-link>
  </form>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'new-gift',
    data() {
      return {
        wishlists: [],
        wishlist: {
          name: "",
          image: "",
          itemurl: ""
        }
      }
    },
    methods: {
      addGift() {
            firebase
              .firestore()
              .collection("accounts")
              .doc(firebase.auth().currentUser.uid)
              .collection("wishlists")
              .add({
                  name: this.wishlist.name,
                  image: this.wishlist.image,
                  itemurl: this.wishlist.itemurl,
                  createdAt: new Date(),
                  isBought: false
              })
              .then(
                () => console.log("hopefully it's done")
              )
              .catch(error => console.log(error))
      }
    }
  }
</script>

<style scoped>
</style>
