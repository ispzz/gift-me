<template>
  <form action="#" @submit.prevent="addGift">
    <div class="ui labeled input fluid">
      <div class="ui label">Name:</div>
      <input type="text" placeholder="what do you want bby grl?" v-model="wishlist.name"/>
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
        <br>
      <button @click="onUpload">Upload</button>
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
            this.picture =url;
          });
        }
        );
      },
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
img.preview {
  width: 200px;
}
</style>
