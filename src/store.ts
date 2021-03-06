/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import firebase from '@/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    savedMethods: [] as any,
    isLoading: true,
    lastDiaryIndex: -1,
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    saveMethod(state, method) {
      state.savedMethods.push(method);
    },
    shotMethods(state) {
      if (!_.isEmpty(state.savedMethods)) {
        _.forEach(state.savedMethods, (method) => method());
        console.log('saved methods are shot');
      }

      state.savedMethods = [];
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
      console.log('loading end');
    },
    addLastDiaryIndex(state) {
      if (state.lastDiaryIndex !== -1) {
        state.lastDiaryIndex += 1;
        console.log('success addLastIndex');
      }
    },
  },
  actions: {
    async setLastDiaryIndex(context) {
      context.state.lastDiaryIndex = (await firebase.database.getDiaryLastIndex()) as number;

      console.log('setted lastIndex: ', context.state.lastDiaryIndex);
    },
  },
});
