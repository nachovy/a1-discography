<template>
  <div class="container py-5">
    <router-link :to="'/single/' + single.id" class="btn btn-back text-back">Back</router-link>
    <div v-if="version" class="mt-4">
      <h1 class="display-4"><b>{{ version.title }}</b></h1>
      <img 
        :src="version.cover" 
        class="img-fluid rounded shadow-lg" 
        style="width: 600px;"
      />
      <ul class="list-unstyled mt-4">
        <li 
          v-for="(song, index) in version.songs" 
          :key="song.title" 
          class="song-item mt-2" 
          :class="{'odd-song': index % 2 === 0, 'even-song': index % 2 !== 0}"
        >
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
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { singles } from "@/data/albums.js";
import SongPlayer from "@/components/SongPlayer.vue";

const route = useRoute();
const single = computed(() => singles.find(s => s.id == route.params.id));
const version = computed(() => single.value?.versions[route.params.versionId]);
const currentSong = ref(null);

onMounted(() => {
  if (version.value) {
    document.title = `${version.value.title} - a1 Discography`;
  }
});

const playSong = (song) => {
  currentSong.value = song;
};
</script>

<style scoped>
.btn-back {
  padding: 8px 16px;
  background-color: #ccc;
  border-radius: 25px;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.text-back {
  color: #333;
}
.btn-back:hover {
  background-color: #999999;
  transform: scale(1.05);
}
.song-item {
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, background 0.3s ease;
  width: 600px;
}
.odd-song {
  background: linear-gradient(135deg, rgba(135, 206, 235, 0.5), rgba(146, 224, 255, 0.5));
}
.even-song {
  background: linear-gradient(135deg, rgba(255, 145, 162, 0.5), rgba(255, 182, 193, 0.5));
}
.song-item:hover {
  transform: scale(1.03);
}
.song-button {
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  display: flex;
  align-items: center;
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
