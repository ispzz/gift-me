<template>
  <div class="app">
    <b-navbar type="is-primary" spaced>
            <!-- <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/wishlist' }">
                    <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    >
                </b-navbar-item>
            </template> -->
            <template slot="start">
                <b-navbar-item tag="router-link" :to="{ path: '/wishlist' }">
                    Wishlist
                </b-navbar-item>
            </template>

            <template slot="end">
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-light">
                          <router-link to="/wishlist/new" >
                            New Wish
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
</style>
