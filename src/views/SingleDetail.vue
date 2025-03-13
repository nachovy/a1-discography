<template>
  <div class="container py-5">
    <router-link to="/singles" class="btn btn-back text-back">Back</router-link>
    <div v-if="single" class="mt-4">
      <h1 class="display-4"><b>{{ single.title }}</b></h1>
      <div class="row row-cols-1 row-cols-md-4 g-4 d-flex  align-items-center">
      <div 
        v-for="(version, index) in single.versions" 
        :key="version.id" 
        class="col"
      >
        <div class="card shadow-lg">
          <router-link 
            :key="index" 
            :to="'/single/' + single.id + '/version/' + index"
            class="list-group-item list-group-item-action"
          >
            <img 
              :src="version.cover" 
              :alt="version.title" 
              class="card-img-top album-cover"
            />
            <h5 class="card-title text-center" style="font-size:1em; height:30px; line-height:30px;">{{ version.title }}</h5>
          </router-link>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { singles } from "@/data/albums.js";

const route = useRoute();
const single = computed(() => singles.find(s => s.id == route.params.id));

onMounted(() => {
  if (single.value) {
    document.title = `${single.value.title} - a1 Discography`;
  }
});
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
.album-cover {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}
.album-cover:hover {
  transform: scale(1.05);
}
</style>
