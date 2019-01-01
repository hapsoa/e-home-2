<template>
  <div class="ppt-root">
    <div class="ppt-menu">
      <v-item-group>
        <v-btn flat>
          <v-icon>crop_din</v-icon>
        </v-btn>
        <v-menu offset-y>
          <v-btn flat slot="activator">
            <v-icon>crop_din</v-icon>
          </v-btn>
          <v-list>
            <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x open-on-hover>
              <!-- <v-list-tile @mouseover="test" @click="test">
                <v-list-tile-title>도형</v-list-tile-title>
              </v-list-tile>-->
              <v-btn slot="activator">도형</v-btn>

              <v-card>
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title>John Leider</v-list-tile-title>
                      <v-list-tile-sub-title>Founder of Vuetify.js</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                        <v-icon>favorite</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>

                <v-divider></v-divider>

                <v-list>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="message" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable messages</v-list-tile-title>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-switch v-model="hints" color="purple"></v-switch>
                    </v-list-tile-action>
                    <v-list-tile-title>Enable hints</v-list-tile-title>
                  </v-list-tile>
                </v-list>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn flat @click="menu = false">Cancel</v-btn>
                  <v-btn color="primary" flat @click="menu = false">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            <v-list-tile @mouseover="test">
              <v-list-tile-title>화살표</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat>
          <v-icon>title</v-icon>
        </v-btn>
        <v-btn-toggle v-model="toggle_exclusive">
          <v-btn flat>
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-item-group>
    </div>
    <svg width="800" height="700">
      <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      toggle_exclusive: 2,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    };
  },
  methods: {
    test() {
      console.log('yop');
    },
  },
};
</script>

<style scoped lang="scss">
// .ppt-root {
// }
</style>