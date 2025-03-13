<template>
  <div class="container py-5">
    <router-link to="/" class="btn btn-back text-back">Back</router-link>
    <div v-if="otherTracks" class="mt-4">
      <h1 class="display-4"><b>Rare Tracks</b></h1>
      <img 
        :src="`/music/other tracks/Rare Tracks.jpg`" 
        class="img-fluid rounded shadow-lg" 
        style="width: 600px;"
      />
      <ul class="list-unstyled mt-4">
        <li 
          v-for="(song, index) in otherTracks" 
          :key="song.title" 
          class="song-item mt-2" 
          :class="{'odd-song': index % 2 === 0, 'even-song': index % 2 !== 0}">
          <button @click="playSong(song);" class="song-button">
            <span class="song-number">{{ index + 1 }}</span> <span class="song-title">{{ song.title }}</span>
          </button>
        </li>
      </ul>
    </div>
    <SongPlayer v-if="currentSong" :song="currentSong" />
  </div>
</template>

<script setup>
import { ref, onMounted  } from "vue";
import { useRoute } from "vue-router";
import { otherTracks } from "@/data/albums.js";
import SongPlayer from "@/components/SongPlayer.vue";
import { eventBus } from "@/utils/eventBus"; 

const route = useRoute();
const currentSong = ref(null);

onMounted(() => {
  document.title = `Rare Tracks - a1 Discography`;
});

const playSong = (song) => {
  currentSong.value = song;
};
</script>

<style scoped>
.btn-back {
  padding: 8px 16px;
  background-color: #ccc;
  color: transparent;
  border-radius: 25px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.text-back {
  color: #333;
}

.btn-back:hover {
  background-color: #999999;
  transform: scale(1.05);
}

.btn-back:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* 美化歌曲列表 */
.song-item {
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.7); /* 背景透明 */
  backdrop-filter: blur(10px); /* 模糊效果 */
  transition: transform 0.3s ease, background 0.3s ease;
  width: 600px;
}

/* 奇数序号歌曲背景渐变效果 */
.odd-song {
  background: linear-gradient(135deg, rgba(135, 206, 235, 0.5), rgba(146, 224, 255, 0.5));
}

/* 偶数序号歌曲背景渐变效果 */
.even-song {
  background: linear-gradient(135deg, rgba(255, 145, 162, 0.5), rgba(255, 182, 193, 0.5));
}

.song-item {
  transition: transform 0.3s ease, background 0.3s ease;
}

.song-item:hover {
  transform: scale(1.03);
  background: linear-gradient(135deg, rgba(135, 206, 235, 0.7), rgba(146, 224, 255, 0.7)); /* Increase opacity on hover */
}

.song-item.even-song:hover {
  background: linear-gradient(135deg, rgba(255, 145, 162, 0.7), rgba(255, 182, 193, 0.7)); /* Increase opacity on hover */
}

.song-button {
  width: 100%; /* Make the button take up the full width of the li */
  background: transparent; /* Remove default button background */
  border: none; /* Remove button border */
  padding: 0; /* Remove extra padding from the button */
  text-align: left; /* Align text to the left */
  font-size: 1rem; /* Adjust the font size as needed */
  display: flex; /* To align the content inside the button */
  align-items: center; /* Vertically center the content */
}

.song-number {
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 10px;
  color: #333;
}

.song-title {
  color: #333;
  font-weight: bold;
}
</style>
