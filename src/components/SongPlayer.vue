<template>
  <div class="position-relative d-flex flex-column" style="min-height: 10vh;">

    <!-- 播放器区域 -->
    <div class="position-fixed bottom-0 start-0 w-100 text-white p-3 d-flex align-items-center z-index-10" style="background:#333">
      <audio ref="audio" controls :src="song.src" class="flex-grow-1" type="audio/x-m4a" autoplay="autoplay"></audio>
      <button @click="toggleLyrics" class="btn btn-info ms-3" style="width: 110px">
        {{ showLyrics ? "Hide" : "Show" }} Lyrics
      </button>
    </div>

    <!-- 歌词区域：显示在播放器后面，只占右半部分 -->
    <div 
      v-if="showLyrics"
      class="position-fixed top-0 end-0 w-1/2 bg-white p-3 shadow-lg transition-transform z-index-5"
      :class="{'translate-x-0': showLyrics, 'translate-x-full': !showLyrics}"
      style="height: calc(100% - 70px);" 
    >
      <iframe :src="song.lyrics" class="w-100 h-100 border-0"></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { eventBus } from "@/utils/eventBus"; 

defineProps(["song"]);
const showLyrics = ref(false);

// 切换歌词显示和隐藏
const toggleLyrics = () => {
  showLyrics.value = !showLyrics.value;
  if (eventBus.closePDF) {
    eventBus.closePDF();
  }
};
</script>

<style scoped>
/* 调整歌词面板的动画 */
.translate-x-0 {
  transform: translateX(0);
}
.translate-x-full {
  transform: translateX(100%);
}

/* 使歌词面板显示在播放器后面 */
.z-index-5 {
  z-index: 5; /* 歌词面板位于播放器下层 */
}

.z-index-10 {
  z-index: 10; /* 播放器位于上层 */
}

.position-fixed.end-0 {
  right: 0;
  width: 35%; /* 歌词面板只占右半边 */
}
</style>
