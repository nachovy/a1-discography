<template>
  <router-view />
</template>

<script setup>
  import { onMounted } from 'vue';
  onMounted(() => {
    document.title = `a1 Discography`;
  });
</script>

<style>
  body {
    background: linear-gradient(to right, #FFFFFF, #FFDBDB);
  }
</style>
