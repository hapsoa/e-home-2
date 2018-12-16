<template>
  <div class="diary-root">
    <nav>
      <input type="text" placeholder="search">
      <v-btn color="info" @click="$router.push({name: 'writing-diary'})">일기 쓰기</v-btn>
    </nav>
    <div class="diaries">
      <div
        class="diary"
        v-for="(diary, index) in diaries"
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
export default {
  name: 'DiaryHome',
  data() {
    return {
      diaries: {},
      page: 1,
    };
  },
  methods: {
    lookDiary(diaryId: string) {
      this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
    },
  },
  async created() {
    this.diaries = await this.$firebase.database.getDiary();

    const temp: object = [];

    this.$_.forEach(this.diaries, (value, key) => {
      value.id = key;
      temp.push(value);
    });

    this.diaries = this.$_.orderBy(temp, ['date'], ['desc']);

    console.log('diaries : ', this.diaries);
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
