<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="ui labeled input fluid">
      <div class="ui label">Name:</div>
      <input type="text" placeholder="what do you want bby grl?" v-model="wishlist.item"/>
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
  </form>
</template>

<script>
  export default {
    // name: 'wishlist-form',
    // props: {
    //   type: Object
    // }
  }
</script>

<style scoped>
</style>
