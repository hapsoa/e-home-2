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
      editorData: '',
      editorConfig: {
          // The configuration of the editor.
      },

      editorType: 'ckeditor', // normal-editor, ckeditor, slide
    };
  },
  methods: {
    /**
     * db로 diary 정보 보내기
     */
    async sendDiary() {
      // 마지막 index를 가지고 있는지 확인
      if (_.isNil(this.$store.state.lastDiaryIndex)) {
        await this.$store.dispatch('setLastDiaryIndex');
      }

      // 일기제목 확인
      if (this.diaryTitle === '') {
        this.diaryTitle = new Date().toLocaleString();
      }

      // 새로 글 쓰는 상황일 때
      if (_.isNil(this.$route.query.diaryData)) {
        try {
          // 무슨 에디터를 사용하는지
          if (this.editorType === 'normal-editor') {
              firebase.database.setDiary({
                title: this.diaryTitle,
                contents: this.diaryContents,
                index: this.$store.state.lastDiaryIndex + 1,
              });
              this.$store.commit('addLastDiaryIndex');
          } else if (this.editorType === 'ckeditor') {
              firebase.database.setDiary({
                title: this.diaryTitle,
                contents: this.editorData,
                index: this.$store.state.lastDiaryIndex + 1,
              });
              this.$store.commit('addLastDiaryIndex');
          }
          // else if (this.editorType === 'slide') {

          // }
        } catch (error) {
            console.error(error);
        }
      } else { // 수정하는 상황일 때
        if (this.editorType === 'normal-editor') {
          // firebase.database.reviseDiary(this.$route.query.diaryId);
        } else if (this.editorType === 'ckeditor') {
          // ckeditor
          firebase.database.reviseDiary({
            id: this.$route.query.diaryId as string,
            title: this.diaryTitle,
            contents: this.editorData,
          });
        }
      }


      this.$router.push({ name: 'diary' });
    },
    showCkeditorContents() {
      console.log(this.editorData);
    },
  },
  created() {
    console.log('query : ', this.$route.query.diaryData);

    if (!_.isNil(this.$route.query.diaryData)) {
      console.log('data exist');
      this.diaryTitle = this.$route.query.diaryData.title;
      this.editorData = this.$route.query.diaryData.contents;
      this.editorType = this.$route.query.diaryData.type;
    } else {
      console.log('data not exist');
    }
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
        height: 500px;
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
