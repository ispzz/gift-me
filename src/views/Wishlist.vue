<template>
  <div>
   <h1> welcome to your Wishlist</h1>
   <table id="words" class="ui celled compact table">
     <thead>
       <tr>
         <th>wants</th>
         <th>URL?</th>
         <th colspan="3"></th>
       </tr>
     </thead>
     <tbody>
       <tr v-for="wishlist in wishlists" :key="wishlist.id">
         <td>{{wishlist.name}}</td>
         <td>{{wishlist.image}}</td>
         <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: wishlist.id } }">
              View
            </router-link>
          </td>
         <td width="75" class="center aligned">Edit</td>
         <td width="75" class="center aligned">Destroy</td>
       </tr>
     </tbody>
   </table>
 </div>
</template>

<script>
  import firebase from "firebase";
  export default {
    name: 'wishlist',
    data() {
      return {
        wishlists: []
      }
    },
    created() {
        this.getLists();
    },
    methods: {
      async getLists() {
          var wishlistsRef = await firebase
              .firestore()
              .collection("accounts")
              .doc(firebase.auth().currentUser.uid)
              .collection("wishlists");
          wishlistsRef.onSnapshot(snap => {
              this.wishlists = [];
              snap.forEach(doc => {
                  var wishlist = doc.data();
                  wishlist.id = doc.id;
                  this.wishlists.push(wishlist);
              });
          });
      },
    }
  }
</script>

<style scoped>
</style>
