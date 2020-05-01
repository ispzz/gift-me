<template>
  <div class="centeredContainer">
    <section class="section">
      <h1 class="title">Add a new gift for yourself</h1>
      <div class="box has-text-centered">
      <form action="#" @submit.prevent="onUpload">
          <b-field label="Name" custom-class="is-large">
            <b-input placeholder="What do you want?" v-model="wishlist.name" rounded/>
          </b-field>

          <b-field label="Url of the item" custom-class="is-large">
            <b-input placeholder="Link" v-model="wishlist.itemurl" rounded/>
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
    name: 'new-gift',
    data() {
      return {
        wishlists: [],
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
    methods: {
      previewImage(event) {
        this.uploadValue=0;
        this.picture=null;
        this.imageData = event.target.files[0];
      },
      onUpload(){
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
              .add({
                  name: this.wishlist.name,
                  image: this.picture,
                  imageName: this.imageData.name,
                  itemurl: this.wishlist.itemurl,
                  createdAt: new Date(),
                  isBought: false
              })
              .then(
                () => console.log("hopefully it's done"),
                this.$router.push('/wishlist')
              ).catch(error => console.log(error))
          });
        }
        );
      },
      logout: function() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
      // addGift() {
      //       firebase
      //         .firestore()
      //         .collection("accounts")
      //         .doc(firebase.auth().currentUser.uid)
      //         .collection("wishlists")
      //         .add({
      //             name: this.wishlist.name,
      //             image: this.wishlist.image,
      //             itemurl: this.wishlist.itemurl,
      //             createdAt: new Date(),
      //             isBought: false
      //         })
      //         .then(
      //           () => console.log("hopefully it's done")
      //         )
      //         .catch(error => console.log(error))
      // }
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
