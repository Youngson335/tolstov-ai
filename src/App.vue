<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import preloadStickers from "./preloadStikers";
import useThemesStore from "./store/themesStore";

const themeStore = useThemesStore();

onMounted(async () => {
  preloadStickers();
});

themeStore.initThemeFromLocalStorage();
themeStore.applyNewTheme();
</script>

<style scoped lang="scss"></style>
