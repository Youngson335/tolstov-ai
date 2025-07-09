<template>
  <div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import useThemesStore from "./store/themesStore";

const themeStore = useThemesStore();

themeStore.initThemeFromLocalStorage();
themeStore.applyNewTheme();
</script>

<style scoped lang="scss">
#nprogress .bar {
  background: #ff4757; /* Например, красный */
  height: 3px;
}

#nprogress .peg {
  box-shadow: 0 0 10px #ff4757, 0 0 5px #ff4757;
}

#nprogress .spinner-icon {
  border-top-color: #ff4757;
  border-left-color: #ff4757;
}
</style>
