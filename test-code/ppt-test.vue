<template>
  <div class="ppt-root">
    <div class="ppt-menu">
      <v-toolbar>
        <v-menu offset-y>
          <v-btn flat slot="activator">
            <v-icon>crop_din</v-icon>
          </v-btn>
          <v-list>
            <v-menu v-model="menu" :nudge-width="200" offset-x open-on-hover>
              <v-list-tile slot="activator">
                <v-list-tile-title>도형</v-list-tile-title>
              </v-list-tile>
              <!-- <v-btn slot="activator">도형</v-btn> -->
              <v-card>
                <v-icon @click="drawMode">crop_din</v-icon>
                <v-icon>panorama_fish_eye</v-icon>
              </v-card>
            </v-menu>
            <v-list-tile @mouseover="test">
              <v-list-tile-title>화살표</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat>
          <v-icon>title</v-icon>
        </v-btn>
        <v-btn-toggle v-model="toggle_exclusive">
          <v-btn flat>
            <v-icon>format_align_left</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_center</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_right</v-icon>
          </v-btn>
          <v-btn flat>
            <v-icon>format_align_justify</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </div>
    <svg width="800" height="700" :draw="isDrawing" @mousedown="startDrawing" @click="drawRect">
      <!-- <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow"></circle> -->
      <rect
        v-for="(rect, index) in rects"
        :key="index"
        :x="rect.x"
        :y="rect.y"
        :width="rect.width"
        :height="rect.height"
        style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"
      ></rect>
    </svg>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      toggle_exclusive: 2,
      menu: false,
      isDrawing: false,
      // 좌표
      startX: 0,
      startY: 0,
      // 네모
      rects: [] as object[],
    };
  },
  methods: {
    test() {
      console.log('yop');
    },
    drawMode() {
      this.isDrawing = true;
    },
    startDrawing(event: any) {
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      console.log('startX, Y : ', this.startX, this.startY);

    },
    drawRect(event: any) {
      if (this.isDrawing === true) {
        // 네모를 그린다.
        // 마우스 클릭시와 뗄시의 좌표를 알아야 한다.
        this.rects.push({
          x: this.startX,
          y: this.startY,
          width: Math.abs(event.offsetX - this.startX),
          height: Math.abs(event.offsetY - this.startY),
        });

        this.isDrawing = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.ppt-root {
  svg {
    &[draw] {
      cursor: crosshair;
    }
  }
}
</style>