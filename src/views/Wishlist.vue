<template>
  <!-- <div>
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
 </div> -->
 <section>
   <b-button type="is-primary" @click="logout">Logout</b-button>
   <h1 class="title">What you like ...</h1>
   <div class="box has-text-centered">
   <b-button size="is-medium" type="is-primary" outlined @click="visible = !visible" rounded>SHARE</b-button>
   <div v-if="visible">
     <p @click="shareWishlist">click me</p>
     <p>{{shareUserId}}</p>
    <router-link :to="{ name: 'ShareView', params: { id: this.shareUserId } }">
       View
     </router-link>
   </div>
   </div>
   <div class="wrapper">
     <div class="card" v-for="wishlist in wishlists" :key="wishlist.id">
       <header class="card-header">
        <p class="card-header-title is-centered">
          {{wishlist.name}}
        </p>
      </header>
       <div class="card-image">
        <figure class="image is-4by3">
          <img :src="wishlist.image" />
        </figure>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">
          <router-link :to="{ name: 'show', params: { id: wishlist.id } }">
            View
          </router-link>
        </a>
        <a class="card-footer-item">
          <router-link :to="{ name: 'edit', params: { id: wishlist.id } }">
            Edit
          </router-link>
        </a>
        <a
        class="card-footer-item"
        @click.prevent="deleteWish(wishlist.id)"
        :href="`/wishlist/${wishlist.id}`"
        >
          Destroy
        </a>
      </footer>
     </div>
   </div>
 </section>
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
      },
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
    grid-gap: 6vh;
  }
  .card {
  height: max-content;
  }
  .title {
    text-align: center;
  }
</style>
