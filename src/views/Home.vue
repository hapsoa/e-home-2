<template>
  <div class="home">
    <div class="message">welcome</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    // HelloWorld,
  },
  created() {
    console.log('uh?');
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 250px;
}
</style>
