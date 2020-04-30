<template>
  <form action="#" @submit.prevent="onUpload">
    <section>
      <b-field label="Name" custom-class="is-large">
        <b-input placeholder="what do you want bby grl?" v-model="wishlist.name" size="is-large" rounded/>
      </b-field>

      <b-field label="Url of the item" custom-class="is-large">
        <b-input placeholder="give us that link bb" v-model="wishlist.itemurl" size="is-large" rounded/>
      </b-field>

      <b-field label="Find Image">
        <input type="file" @change="previewImage" accept="image/*" >
      </b-field>

      <b-field>
        <p>Progress: {{uploadValue.toFixed()+"%"}}
        <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
      </b-field>

      <div v-if="imageData!=null">
          <img class="preview" :src="picture">
      </div>

      <button class="positive ui button">Submit</button>
      <router-link to="/">Cancel</router-link>
    </section>
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
</style>
