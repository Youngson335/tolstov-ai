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
        <vue-button @click="goToPage('/welcome')">приветствие</vue-button>
        <vue-button @click="goToPage('/chat')">чат</vue-button>
      </div>
    </header>
    <section class="home-view__main">
      <vue-main>
        <router-view v-slot="{ Component, route }">
          <transition
            :name="shouldAnimate(route) ? transitionName : 'none'"
            mode="out-in"
          >
            <component
              :is="Component"
              :key="route.path"
              :user-info="userInfo"
            />
          </transition>
        </router-view>
      </vue-main>
    </section>
    <div class="home-view__exit-profile" @click="onExitFromProfile">
      <vue-button>Выйти из профиля</vue-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import initStore from "../store/initStore";
import VueToggleSwitch from "../components/Switch/VueToggleSwitch.vue";
import type ToggleSwitchOption from "../components/Switch/ToggleSwitchOption";
import VueMain from "../components/Main/VueMain.vue";
import VueButton from "../components/Buttons/VueButton.vue";
import router from "../index";
import { useRoute } from "vue-router";
import { useUserInfoStore } from "../store/userInfoStore";
import type { UserFIO } from "../components/User/UserFIO";

enum MenuRoutes {
  INFO = "/info",
  SETTINGS = "/settings",
  SETTINGS_AI = "/settings/ai",
  SETTINGS_USER = "/settings/user",
  STATISTICS = "/statistics",
}

enum MenuId {
  INFO = 1,
  SETTINGS = 2,
  STATISTICS = 3,
}

const route = useRoute();
const userInfoStore = useUserInfoStore();

const userInfo = computed((): UserFIO => {
  return {
    userFamilyName: userInfoStore.userFamilyName,
    userName: userInfoStore.userName,
    userSurName: userInfoStore.userSurName,
  };
});

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

const settingsOption: ToggleSwitchOption[] = [
  {
    id: MenuId.SETTINGS,
    name: "Юзер",
    route: MenuRoutes.SETTINGS_USER,
  },
  {
    id: MenuId.SETTINGS,
    name: "ai",
    route: MenuRoutes.SETTINGS_AI,
  },
];

const transitionName = ref("slide-left"); // Начальное направление анимации
const shouldAnimate = (route: any): boolean => {
  const pathsToAnimate = [
    MenuRoutes.INFO,
    MenuRoutes.SETTINGS,
    MenuRoutes.STATISTICS,
  ];
  return pathsToAnimate.includes(route.path);
};
const prevIndex = ref(MenuId.INFO);

const menuItemsOrder = {
  [MenuRoutes.INFO]: 1,
  [MenuRoutes.SETTINGS]: 2,
  [MenuRoutes.SETTINGS_AI]: 2,
  [MenuRoutes.SETTINGS_USER]: 2,
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
  let activeMenu = menuItems.find((menuItem: ToggleSwitchOption) => {
    return menuItem.route === path;
  });
  if (!activeMenu) {
    activeMenu = settingsOption.find((settingOption: ToggleSwitchOption) => {
      return settingOption.route === path;
    });
    if (activeMenu) {
      activeMenuItemId.value = activeMenu.id;
    } else {
      activeMenuItemId.value = MenuId.INFO;
    }
  } else {
    activeMenuItemId.value = activeMenu.id;
  }
};

const goToPage = (path: string) => {
  router.push(path);
};

const onExitFromProfile = () => {
  userInfoStore.exitFromProfile();
  router.push("/welcome");
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
    padding: 15px 0px;

    &-profile {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--dark-violet);
      padding: 10px;
      border-radius: var(--radius);
      margin: 0 auto;
      margin-bottom: 15px;
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
      gap: 15px;
      margin-top: 15px;
    }
  }
  &__main {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  &__exit-profile {
    margin: 15px 0px;
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
