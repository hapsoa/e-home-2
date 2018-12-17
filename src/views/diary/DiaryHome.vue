<template>
  <div class="diary-root">
    <nav>
      <input type="text" placeholder="search">
      <v-btn color="info" @click="$router.push({name: 'writing-diary'})">일기 쓰기</v-btn>
    </nav>
    <div class="diaries">
      <div
        class="diary"
        v-for="(diary, index) in getPage()"
        :key="diary.id"
        @click="lookDiary(diary.id)"
      >{{diary.title}}</div>
    </div>
    <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="6"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import firebase from '@/firebase';

export default {
  name: 'DiaryHome',
  data() {
    return {
      diaries: [] as object[],
      page: 1,
    };
  },
  methods: {
    lookDiary(diaryId: string) {
      this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
    },
    async initializeView() {
      const diaries: object = await firebase.database.getDiary();

      const temp: object[] = [];

      _.forEach(diaries, (value, key) => {
        value.id = key;
        temp.push(value);
      });

      this.diaries = _.orderBy(temp, ['date'], ['desc']);

      console.log('diaries : ', this.diaries);
    },
    getPage(pageNum: number) {
      // 2면 this.dairies[10] ~ this.diaries[19] 까지만 가지고 있는 배열을 만든다.
      const initNum = (this.page - 1) * 10;
      const pageArray = _.slice(this.diaries, initNum, initNum + 10);
      return pageArray;
    },
  },
  async created() {
    if (!_.isNil(firebase.auth.getCurrentUser())) {
      console.log('asdfasdf');
      this.initializeView();
    } else {
      this.$store.commit('saveMethod', this.initializeView);
    }
  },
};
</script>

<style scoped lang="scss">
.diary-root {
  width: 100%;
  height: 100%;
  > nav {
    text-align: center;
    border-bottom: 1px solid #aaa;
    padding: 10px 0;
    > button {
      margin-left: 20px;
    }
  }
  > .diaries {
    > .diary {
      padding: 10px;
      border-bottom: 1px solid #ccc;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
  }
}
</style>
