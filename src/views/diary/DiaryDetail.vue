<template>
  <div class="diary-detail">
    <div class="crud-button-zone">
      <v-btn flat icon color="#aaa" @click="reviseDiary">
        <v-icon>create</v-icon>
      </v-btn>      
      <icon-modal :cardTitle="'일기 삭제'" 
        :cardText="'일기를 삭제하시겠습니까? 삭제를 하시면 복원할 수 없습니다.'" 
        :agreeListener="deleteDiary" />
    </div>
    <div class="detail-view" v-html="diaryData.contents"></div>
    <v-btn color="#bbb" @click="$router.go(-1)">돌아가기</v-btn>      
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import firebase from '@/firebase';
import IconModal from '@/components/IconModal.vue';

export default {
  name: 'DiaryDetail',
  components: {
    IconModal,
  },
  data(): any {
    return {
      id: this.$route.query.id,
      diaryData: {},
      dialog: false,
    };
  },
  methods: {
    async initializeView() {
      this.diaryData = await this.$firebase.database.getDiary(this.id);
      this.diaryData.contents = this.diaryData.contents.split(/\n|\r|↵/).join('<br>');
    },
    reviseDiary() {
      console.log('devise diary');
      this.$router.push({name: 'writing-diary', query: {
        diaryData: this.diaryData,
        diaryId: this.id,
      } as any});
    },
    async deleteDiary() {
      try {
        await firebase.database.deleteDiary(this.id);
        this.$router.push({name: 'diary'});
      } catch (error) {
        console.error('Error removing diary: ', error);
      }
    },
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
  > .crud-button-zone {
    display: flex;
    justify-content: flex-end;
  }
  > .detail-view {
    min-height: 500px;
    margin: 30px;
    padding: 10px;
    border: 1px solid #ddd;
  }
  > .v-btn {
    float: right;
  }
}
</style>
