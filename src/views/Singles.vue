<template>
  <div class="bg-gradient p-5 min-vh-100">
    <router-link to="/" class="btn btn-back text-back">Back</router-link>
    <h1 class="display-4" style="height:75px">Singles</h1>
    <div class="row row-cols-1 row-cols-md-4 g-4 d-flex align-items-center">
      <div 
        v-for="single in singles" 
        :key="single.id" 
        class="col"
      >
        <div class="card shadow-lg">
          <router-link :to="'/single/' + single.id" class="d-block">
            <img 
              :src="single.cover" 
              :alt="single.title" 
              class="card-img-top album-cover"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { singles } from "@/data/albums.js";

onMounted(() => {
  document.title = `Singles - a1 Discography`;
});
</script>

<style scoped>
/* 按钮和卡片样式复用 */
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

.album-cover {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.album-cover:hover {
  transform: scale(1.05);
}
</style>
