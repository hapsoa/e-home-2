<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <!-- <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn> -->
    <v-btn flat icon slot="activator" color="#aaa">
      <v-icon>{{buttonIcon}}</v-icon>
    </v-btn>
    <v-card>
      <v-card-title class="headline">{{cardTitle}}</v-card-title>
      <v-card-text>{{cardText}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
        <v-btn color="green darken-1" flat @click="agree">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import _ from 'lodash';

export default {
  props: {
    buttonIcon: {
      type: String,
      default: 'delete,',
    },
    cardTitle: {
      type: String,
      default: '제목,',
    },
    cardText: {
      type: String,
      default: '내용이 들어가는 부분입니다.,',
    },
    agreeListener: {
        type: Function,
        default: null,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    agree() {
      if (!_.isNil(this.agreeListener)) {
        this.agreeListener();
      }
      this.dialog = false;
    },
    disagree() {
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>
