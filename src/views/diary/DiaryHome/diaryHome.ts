import Vue from 'vue';
import _ from 'lodash';
import firebase from '@/firebase';

export default {
  name: 'DiaryHome',
  data() {
    return {
      diaries: [] as object[],
      page: 1,
      pageLength: 0,
    };
  },
  methods: {
    lookDiary(diaryId: string) {
      this.$router.push({ name: 'diary-detail', query: { id: diaryId } });
    },
    async initializeView() {
      if (this.$store.state.lastDiaryIndex === -1) {
        await this.$store.dispatch('setLastDiaryIndex');
      }

      const diaries: object[] = (await firebase.database.getDiaryPerPage({
        pageNumber: this.page,
        lastDiaryIndex: this.$store.state.lastDiaryIndex,
      })) as object[];

      this.diaries = diaries;

      // this.pageLength = Math.ceil(this.diaries.length / 10);
      this.pageLength = Math.ceil((this.$store.state.lastDiaryIndex + 1) / 10);
    },
  },
  computed: {
    getPage(): object[] {
      // 2면 this.dairies[10] ~ this.diaries[19] 까지만 가지고 있는 배열을 만든다.
      const initNum: number = (this.page - 1) * 10;
      const pageArray: object[] = _.slice(this.diaries, initNum, initNum + 10);
      return pageArray;
    },
  },
  watch: {
    async page(to, from) {
      this.diaries = (await firebase.database.getDiaryPerPage({
        pageNumber: to,
        lastDiaryIndex: this.$store.state.lastDiaryIndex,
      })) as object[];
    },
  },
  async created() {
    if (!_.isNil(firebase.auth.getCurrentUser())) {
      this.initializeView();
    } else {
      this.$store.commit('saveMethod', this.initializeView);
    }
  },
};
