<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">a1 Discography</h1>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="category in categories" :key="category.name">
        <router-link 
          :to="category.link" 
          class="btn btn-primary w-100"
        >
          {{ category.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { onMounted } from 'vue';

  onMounted(() => {
    document.title = `a1 Discography`;
  });

  const categories = ref([
    { name: "Albums", link: "/albums" },  // Redirect to AlbumList
    { name: "Singles", link: "/singles" },
    { name: "Other Tracks", link: "/other-tracks" },
  ]);
</script>

<style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
</style>
