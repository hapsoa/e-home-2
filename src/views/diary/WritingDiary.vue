<template>
<div class="making-memo-root">
    <form>
      <label>제목</label>
      <input type="text" v-model="diaryTitle" />
    </form>
    <textarea v-model="diaryContents" />
    <div class="controller">
      <button type="button" @click="$router.go(-1)">취소</button>
        <!-- 데이터베이스에 메모 내용을 저장시키고, 해당 내용을 보여 준다.-->
        <button type="button" @click="sendDiary()">저장</button>
        </div>
</div>
</template>

<script>
export default {
  name: 'MakingMemo',
  data() {
    return {
      diaryTitle: new Date().toLocaleDateString(),
      diaryContents: '',
    };
  },
  methods: {
    async sendDiary() {
      console.log('textArea : ', this.diaryContents);
      this.$router.push({ name: 'diary' });
      this.$firebase.database.setDiary({ title: this.diaryTitle, contents: this.diaryContents });
    },
  },
};
</script>

<style scoped lang="sass">
  .making-memo-root
    width: 100%
    height: 100%
    padding: 30px
    > textarea
      width: 100%
      height: calc(100% - 80px)
      border: 1px solid #aaa
    > .controller
      width: 100%
      height: 80px
      background: #aaa
      text-align: center
      > button
        margin: 0 10px

</style>
