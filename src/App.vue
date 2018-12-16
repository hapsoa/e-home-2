<template>
  <v-app>
    <v-toolbar dense app flat v-if="$store.state.isLogin">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="headline" @click="$router.push({name: 'home'})">
        <span>e-home</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <v-btn
            slot="activator"
            color="primary"
            dark
          >
            Profile
          </v-btn>
          <v-list>
            <v-list-tile
              @click=""
            >
              <v-list-tile-title>my page</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
              @click="logout"
            >
              <v-list-tile-title>logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    
    <v-navigation-drawer app v-model="drawer" v-if="$store.state.isLogin">
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
  
      <v-divider></v-divider>
  
      <v-list dense class="pt-0">
        <v-list-tile      
          @click="$router.push({name: 'diary'})"
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>Diary</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense class="pt-0">
        <v-list-tile      
          @click=""
        >
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
  
          <v-list-tile-content>
            <v-list-tile-title>Memo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <!-- <HelloWorld/> -->
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import _ from 'lodash';
import firebase from './firebase';

Vue.prototype.$_ = _;
Vue.prototype.$firebase = firebase;

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
    logout() {
      firebase.auth.logout();
      this.$store.commit('logout');
      this.$router.push('/login');
    },
  },
  created() {
    firebase.auth.setUserOnlineListener(() => {
      this.$store.commit('login');
      this.$store.commit('shotMethods');
      this.$store.commit('endLoading');
      // login page일 때
      if (this.$route.name === 'login') {
        this.$router.push('/');
      }
    });
    firebase.auth.setUserOfflineListener(() => {
      this.$store.commit('logout');
      this.$store.commit('endLoading');
      this.$router.push('/login');
    });
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}

router-view {
  width: 100%;
  height: 200vh;
  overflow: hidden;
}

.v-toolbar__title {
  cursor: pointer;
}


</style>



