import { useUserInfoStore } from "./userInfoStore";

const initStore = async () => {
    await useUserInfoStore().initUserAuth();
}

export default initStore;