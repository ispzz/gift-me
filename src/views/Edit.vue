<template>
  <form action="#" @submit.prevent="updateWish">
    <div class="ui labeled input fluid">
      <div class="ui label">Name:</div>
      <input type="text" placeholder="what do you want bby grl?" v-model="wishlist.name"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Buy it Link</div>
      <input type="text" placeholder="give us that link bb" v-model="wishlist.itemurl"/>
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">Find Image:</div>
      <input type="file" @change="previewImage" accept="image/*" >
    </div>
    <div class="ui labeled input fluid">
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>
    <div v-if="imageData!=null">
        <img class="preview" :src="picture">
    </div>

    <button class="positive ui button">Submit</button>
    <router-link to="/">Cancel</router-link>
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
          itemurl: "",
          imageName: ""
        },
        imageData: null,
        picture: null,
        uploadValue: 0
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
                itemurl: snap.data().itemurl,
                imageName: snap.data().imageName
              };
              console.log(snap.data());
              console.log(snap.data().name);
            });
      },
      previewImage(event) {
        this.uploadValue=0;
        if (this.picture) {
          return
        } else {
          this.picture=null;
        }
        this.imageData = event.target.files[0];
      },
      updateWish() {
        const id = this.$route.params.id;
        this.picture=null;
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture = url;
            firebase
              .firestore()
              .collection("accounts")
              .doc(firebase.auth().currentUser.uid)
              .collection("wishlists")
              .doc(id)
              .update({
                name: this.wishlist.name,
                image: this.wishlist.image,
                itemurl: this.wishlist.itemurl,
                imageName: this.wishlist.imageName
              }).then(() => {
                this.$router.push({ name: 'show', params: { id: this.$route.params.id } });
              });
          });
        }
        );
        // const id = this.$route.params.id;
        // firebase
        //   .firestore()
        //   .collection("accounts")
        //   .doc(firebase.auth().currentUser.uid)
        //   .collection("wishlists")
        //   .doc(id)
        //   .update({
        //     name: this.wishlist.name,
        //     image: this.wishlist.image,
        //     itemurl: this.wishlist.itemurl,
        //     imageName: this.wishlist.imageName
        //   }).then(() => {
        //     this.$router.push({ name: 'show', params: { id: this.$route.params.id } });
        //   })
      }
    }
  }
</script>

<style scoped>
</style>
