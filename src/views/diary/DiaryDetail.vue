<template>
  <div class="diary-detail">
    <div class="detail-view" v-html="diaryData.contents"></div>
    <v-btn color="#bbb" @click="$router.go(-1)">돌아가기</v-btn>
  </div>
</template>

<script>
import _ from 'lodash';
import firebase from '@/firebase';

export default {
  name: 'DiaryDetail',
  // props: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      id: this.$route.query.id,
      diaryData: {},
    };
  },
  methods: {
    async initializeView() {
      this.diaryData = await this.$firebase.database.getDiary(this.id);
      this.diaryData.contents = this.diaryData.contents.split(/\n|\r|↵/).join('<br>');
    }
  },
  created() {
    if (!_.isNil(firebase.auth.getCurrentUser())) {
      this.initializeView();
    } else {
      this.$store.commit('saveMethod', this.initializeView);
    }
  },
};
</script>

<style scoped lang="scss">
.diary-detail {
  width: 100%;
  // height: 100%;
  > .detail-view {
    min-height: 500px;
    margin: 30px;
    padding: 10px;
    border: 1px solid #ddd;
  }

}
</style>
