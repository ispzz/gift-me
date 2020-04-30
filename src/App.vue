<template>
  <div class="app">
    <b-navbar type="is-primary" spaced>
            <template slot="brand">
                    <img
                        class="logo"
                        src="https://i.imgur.com/E0PEG10.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    >
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-light">
                          <router-link to="/wishlist/new" >
                            New Wish
                          </router-link>
                        </a>
                        <a class="button is-light">
                          <router-link to="/wishlist" >
                            Wishlist
                          </router-link>
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
        <div class="container">
          <div class="another-container">
            <router-view />
          </div>
        </div>
  </div>
</template>

<style>
.another-container {
  margin-top: 3em;
}
.textColor {
  color: white;
}
.logo {
  width: 9em;
}
</style>
