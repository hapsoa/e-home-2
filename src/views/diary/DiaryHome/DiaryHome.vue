<template>
  <div class="diary-root">
    <nav>
      <input type="text"
             placeholder="search">
      <v-btn color="info"
             @click="$router.push({name: 'writing-diary'})">일기 쓰기</v-btn>
    </nav>
    <div class="diaries">
      <div class="diary"
           v-for="(diary) in diaries"
           :key="diary.id"
           @click="lookDiary(diary.id)">{{diary.title}}</div>
    </div>
    <div class="text-xs-center">
      <v-pagination v-model="page"
                    :length="pageLength"></v-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import script from '@/views/diary/DiaryHome/diaryHome.ts';
export default script;
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
