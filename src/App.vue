<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title class="headline">
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
              @click=""
            >
              <v-list-tile-title>logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      //
    }
  }
}
</script>
