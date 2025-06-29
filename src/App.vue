<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import preloadStickers from "./preloadStikers";

onMounted(async () => {
  preloadStickers();
});
</script>

<style scoped lang="scss"></style>
