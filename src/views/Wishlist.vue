<template>
  <div>
   <h1> welcome to your Wishlist</h1>
   <b-button type="is-primary" outlined @click="visible = !visible">SHARE</b-button>
   <div v-if="visible">
     <p @click="shareWishlist">click me</p>
     <p>{{shareUserId}}</p>
    <router-link :to="{ name: 'ShareView', params: { id: this.shareUserId } }">
       View
     </router-link>
   </div>
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
         <td><img :src="wishlist.image" /></td>
         <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: wishlist.id } }">
              View
            </router-link>
          </td>
         <td width="75" class="center aligned">
           <router-link :to="{ name: 'edit', params: { id: wishlist.id } }">
             Edit
           </router-link>
         </td>
         <td width="75" class="center aligned" @click.prevent="deleteWish(wishlist.id)">
            <a :href="`/wishlist/${wishlist.id}`">Destroy</a>
          </td>
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
        wishlists: [],
        visible: false,
        shareUserId: null
      }
    },
    created() {
        this.getLists();
    },
    methods: {
      async getLists() {
          this.shareUserId = firebase.auth().currentUser.uid;
          var wishlistsRef = await firebase
              .firestore()
              .collection("accounts")
              .doc(firebase.auth().currentUser.uid)
              .collection("wishlists");
          wishlistsRef.onSnapshot(snap => {
              this.wishlists = [];
              snap.forEach(doc => {
                console.log(doc.data());
                console.log(this.wishlists);
                  var wishlist = doc.data();
                  wishlist.id = doc.id;
                  this.wishlists.push(wishlist);
              });
          });
      },
      async deleteWish(docId) {
        const sure = window.confirm('Are you sure?');
        if (!sure) return;
        firebase
            .firestore()
            .collection("accounts")
            .doc(firebase.auth().currentUser.uid)
            .collection("wishlists")
            .doc(docId)
            .delete();
      },
      shareWishlist() {
        const shareUserId2 = firebase.auth().currentUser.uid;
        console.log(shareUserId2);
        this.$router.push('share-view/' + shareUserId2);
        // firebase
        //   .firestore()
        //   .collection("accounts")
        //   .doc(firebase.auth().currentUser.uid)
        //   .add({
        //
        //   })
      }
    }
  }
</script>

<style scoped>
</style>
