<template>
  <div class="centeredContainer">
    <section class="section">
      <!-- <b-button type="is-primary" @click="logout" rounded>Logout</b-button> -->
      <h1 class="title">Edit</h1>
      <div class="box has-text-centered">
      <form @submit.prevent="updateWish">
          <b-field label="Name" custom-class="is-large">
            <b-input :value="wishlist.name" v-model="wishlist.name" rounded/>
          </b-field>

          <b-field label="Url of the item" custom-class="is-large">
            <b-input v-model="wishlist.itemurl" rounded/>
          </b-field>

          <b-field label="Find Image">
            <input type="file" @change="previewImage" accept="image/*" >
          </b-field>

          <b-field>
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress type="is-danger" id="progress" :value="uploadValue" max="100" ></progress>  </p>
          </b-field>

          <div v-if="imageData!=null">
              <img class="preview" :src="picture">
          </div>

          <button type="is-primary">Submit</button><br/>
          <router-link to="/wishlist">Return</router-link>
      </form>
      </div>
    </section>
  </div>
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
        this.picture=null;
        this.imageData = event.target.files[0];
      },
      updateWish() {
        console.log("HELLOOO");
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
                image: this.picture,
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
img.preview {
  width: 200px;
}
.section {
  width: 40vw;
  text-align: center;
}
.centeredContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
