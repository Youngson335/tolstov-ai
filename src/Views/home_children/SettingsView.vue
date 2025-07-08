<template>
  <div class="settings-view">
    <vue-toggle-switch
      :options="settingsOption"
      v-model="settingOptionValue"
      @input="onSelectNewOption"
      :is-animation="false"
    />
    <router-view v-slot="{ Component, route }">
      <component
        :is="Component"
        :key="route.path"
        :user-info="props.userInfo"
      />
    </router-view>
    <div class="settings-view__themes">
      <h3>Изменить тему приложения</h3>
      <div class="settings-view__themes-cards">
        <vue-theme-card
          v-for="theme of themes"
          :key="theme.id"
          :theme="theme"
          @click="onEditColorTheme(theme.id)"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, ref } from "vue";
import type { UserFIO } from "../../components/User/UserFIO";
import VueToggleSwitch from "../../components/Switch/VueToggleSwitch.vue";
import type ToggleSwitchOption from "../../components/Switch/ToggleSwitchOption";
import { useRoute } from "vue-router";
import router from "../..";
import VueThemeCard from "../../components/Cards/VueThemeCard.vue";
import themes from "../../assets/themes";
import useThemesStore from "../../store/themesStore";

enum SettingsId {
  USER = 1,
  AI = 2,
}

enum SettingsRoutes {
  USER = "/settings/user",
  AI = "/settings/ai",
  BASE = "/settings",
}

const props = defineProps<{
  userInfo: UserFIO;
}>();
const route = useRoute();

const themesStore = useThemesStore();

const settingsOption: ToggleSwitchOption[] = [
  {
    id: SettingsId.USER,
    name: "user",
    route: SettingsRoutes.USER,
  },
  {
    id: SettingsId.AI,
    name: "ai",
    route: SettingsRoutes.AI,
  },
];

const settingOptionValue = ref<SettingsId | null>(null);
const settingOptionObj = ref<ToggleSwitchOption | null>(null);

const onSelectNewOption = (id: number) => {
  const settingOption = settingsOption.find((item: ToggleSwitchOption) => {
    return item.id === id;
  });
  if (settingOption) {
    settingOptionValue.value = settingOption!.id;
    initOption(settingOption);
  } else {
    settingOptionValue.value = SettingsId.USER;
    initOption(settingsOption[0]);
  }
};

const onEditColorTheme = (themeId: number) => {
  themesStore.initTheme(themeId);
  themesStore.applyNewTheme();
};

const initOption = (option: ToggleSwitchOption) => {
  settingOptionObj.value = option;
  router.push(option.route!);
};

const setActiveOption = (path: SettingsRoutes) => {
  const settingOption = settingsOption.find((option: ToggleSwitchOption) => {
    return option.route === path;
  });

  if (settingOption) {
    onSelectNewOption(settingOption.id);
  }
};

const parseQuery = () => {
  const path = route.path as SettingsRoutes;
  setActiveOption(path);
};

parseQuery();
</script>
<style lang="scss" scoped>
.settings-view {
  width: calc(100% - 50px);
  background: var(--gray);
  padding: var(--padding-block);
  min-height: 50vh;
  border-radius: calc(var(--padding-block) + var(--radius));
  & p {
    margin-bottom: 10px;
  }
  &__themes {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    & h3 {
      margin-bottom: 10px;
    }
    &-cards {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      gap: 10px;
    }
  }
}
</style>
