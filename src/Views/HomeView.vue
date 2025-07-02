<template>
  <div class="home-view">
    <header class="home-view__header">
      <div class="home-view__header-profile">
        <h2>
          Личный
          <span>кабинет</span>
        </h2>
      </div>
      <div class="home-view__header-menu">
        <vue-toggle-switch
          v-model="activeMenuItemId"
          :options="menuItems"
          @input="onSwitchRoute"
        />
      </div>
      <div class="home-view__header-navigation">
        <vue-button>приветствие</vue-button>
        <vue-button>чат</vue-button>
      </div>
    </header>
    <section class="home-view__main">
      <vue-main>
        <router-view v-slot="{ Component, route }">
          <transition :name="transitionName" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </vue-main>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import initStore from "../store/initStore";
import VueToggleSwitch from "../components/Switch/VueToggleSwitch.vue";
import type ToggleSwitchOption from "../components/Switch/ToggleSwitchOption";
import VueMain from "../components/Main/VueMain.vue";
import VueButton from "../components/Buttons/VueButton.vue";
import router from "../index";
import { useRoute } from "vue-router";

enum MenuRoutes {
  INFO = "/info",
  SETTINGS = "/settings",
  STATISTICS = "/statistics",
}

enum MenuId {
  INFO = 1,
  SETTINGS = 2,
  STATISTICS = 3,
}

const route = useRoute();

const activeMenuItemId = ref(1);
const menuItems: ToggleSwitchOption[] = [
  {
    id: MenuId.INFO,
    name: "Информация",
    route: MenuRoutes.INFO,
  },
  {
    id: MenuId.SETTINGS,
    name: "Настройки",
    route: MenuRoutes.SETTINGS,
  },
  {
    id: MenuId.STATISTICS,
    name: "Статистика",
    route: MenuRoutes.STATISTICS,
  },
];

const transitionName = ref("slide-left"); // Начальное направление анимации
const prevIndex = ref(MenuId.INFO);

const menuItemsOrder = {
  [MenuRoutes.INFO]: 1,
  [MenuRoutes.SETTINGS]: 2,
  [MenuRoutes.STATISTICS]: 3,
};

watch(
  () => route.path,
  (newPath, oldPath) => {
    const newIndex = menuItemsOrder[newPath as MenuRoutes];
    const oldIndex = menuItemsOrder[oldPath as MenuRoutes];

    transitionName.value = newIndex > oldIndex ? "slide-left" : "slide-right";
    prevIndex.value = newIndex;
    activeMenuItemId.value = prevIndex.value;
  }
);

const onSwitchRoute = async (menuId: MenuId) => {
  await new Promise((resolve) => setTimeout(resolve, 50));

  switch (menuId) {
    case MenuId.INFO:
      await router.push(MenuRoutes.INFO);
      break;
    case MenuId.SETTINGS:
      await router.push(MenuRoutes.SETTINGS);
      break;
    case MenuId.STATISTICS:
      await router.push(MenuRoutes.STATISTICS);
      break;
    default:
      await router.push(MenuRoutes.INFO);
  }
};

const parseQuery = () => {
  const path = route.path as MenuRoutes;
  setActiveMenu(path);
};

const setActiveMenu = (path: string) => {
  const activeMenu = menuItems.find((menuItem: ToggleSwitchOption) => {
    return menuItem.route === path;
  });
  activeMenuItemId.value = activeMenu!.id;
};

parseQuery();
initStore();
</script>
<style lang="scss">
:root {
  --animation-to-px: translateX(100vw);
  --animation-back-px: translateX(-100vw);
}
.home-view {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &__header {
    width: calc(100% - 50px);
    padding: 20px 0px;

    &-profile {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--dark-violet);
      padding: 10px;
      border-radius: var(--radius);
      margin: 0 auto;
      margin-bottom: 20px;
      & span {
        display: inline-block;
        background: var(--violet);
        padding: 0px 16px;
        border-radius: 18px;
        font-weight: 600;
        color: var(--white);
      }
    }
    &-menu {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &-navigation {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }
  }
  &__main {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease;
}

.slide-left-enter-from {
  transform: var(--animation-to-px);
}

.slide-left-leave-to {
  transform: var(--animation-back-px);
}

/* Анимация справа налево */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s ease;
}

.slide-right-enter-from {
  transform: var(--animation-back-px);
}

.slide-right-leave-to {
  transform: var(--animation-to-px);
}
</style>
