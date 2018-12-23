<template>
<div class="making-memo-root">
    <form>
      <label>제목</label>
      <input type="text" v-model="diaryTitle" :placeholder="diaryDate" />
    </form>
    <div class="editors">
      <div class="editor-type">
        <v-btn @click="editorType='normal-editor'">일반 에디터</v-btn>
        <v-btn @click="editorType='ckeditor'">ck editor</v-btn>
        <v-btn>slide</v-btn>
        <v-btn @click="showCkeditorContents">contents console</v-btn>
      </div>
      <textarea v-if="editorType === 'normal-editor'" v-model="diaryContents" />
      <ckeditor v-if="editorType === 'ckeditor'" :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
    </div>
    <div class="controller">
      <v-btn @click="$router.go(-1)" :flat="true">취소</v-btn>
        <!-- 데이터베이스에 메모 내용을 저장시키고, 해당 내용을 보여 준다.-->
      <v-btn @click="sendDiary()" :flat="true">저장</v-btn>
    </div>
</div>
</template>

<script lang="ts">
import _ from 'lodash';
import firebase from '@/firebase';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  name: 'MakingMemo',
  components: {
    // Use the <ckeditor> component in this view.
    // ckeditor: CKEditor.component
  },
  data() {
    return {
      diaryTitle: '',
      diaryDate: new Date().toLocaleDateString() + '(시간포함)',
      diaryContents: '',
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
          // The configuration of the editor.
      },
      editorType: 'ckeditor', // normal-editor, ckeditor, slide
    };
  },
  methods: {
    async sendDiary() {
      // console.log('textArea : ', this.diaryContents);
      if (_.isNil(this.$store.state.lastDiaryIndex)) {
        await this.$store.dispatch('setLastDiaryIndex');
      }

      if (this.diaryTitle === '') {
        this.diaryTitle = new Date().toLocaleString();
      }

      firebase.database.setDiary({
        title: this.diaryTitle,
        contents: this.diaryContents,
        index: this.$store.state.lastDiaryIndex + 1,
      });

      this.$store.commit('addLastDiaryIndex');

      this.$router.push({ name: 'diary' });
    },
    showCkeditorContents() {
      console.log(this.editorData);
    },
  },
};
</script>

<style scoped lang="scss">
  .making-memo-root {
    width: 100%;
    height: 100%;
    padding: 30px;
    > form {
      margin-bottom: 5px;
      > label {
        margin-right: 5px;
      }
      > input {
        border: 1px solid #ccc;
      }
    }
    .editors {
      > textarea {
        width: 100%;
        height: calc(100% - 80px);
        border: 1px solid #aaa;
        padding: 10px;
        &:focus {
          outline: none !important;
          border: 1px solid #ccc;
        }
      }
    }
    > .controller {
      width: 100%;
      height: 80px;
      background: #aaa;
      text-align: center;
      > button {
        margin: 0 10px;
      }
    }
  }

</style>
