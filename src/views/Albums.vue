<template>
  <div class="bg-gradient p-5 min-vh-100">
    <router-link to="/" class="btn btn-back text-back">Back</router-link>
    <h1 class="display-4" style="height:75px">Albums</h1>
    <div class="row row-cols-1 row-cols-md-3 g-4 d-flex  align-items-center">
      <div 
        v-for="album in albums" 
        :key="album.id" 
        class="col"
      >
        <div class="card shadow-lg">
          <router-link :to="'/album/' + album.id" class="d-block">
            <img 
              :src="album.cover" 
              :alt="album.title" 
              class="card-img-top album-cover"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { albums, singles } from "@/data/albums.js";

onMounted(() => {
  document.title = `Albums - a1 Discography`;
});
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

.album-cover {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.album-cover:hover {
  transform: scale(1.05);
}
</style>
