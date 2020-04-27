import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = '';

// Your web app's Firebase configuration
// add this to it's own file later thnxxx XX GOSSIP GIRL
  var firebaseConfig = {
    apiKey: "AIzaSyDOyNRmRrfULvNKhzbrCE5pTkWNTKLHeQU",
    authDomain: "buy-it-plz.firebaseapp.com",
    databaseURL: "https://buy-it-plz.firebaseio.com",
    projectId: "buy-it-plz",
    storageBucket: "buy-it-plz.appspot.com",
    messagingSenderId: "488376540131",
    appId: "1:488376540131:web:0e2a6bd09a0db7eb2eded6",
    measurementId: "G-E69RYZM95Z"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
