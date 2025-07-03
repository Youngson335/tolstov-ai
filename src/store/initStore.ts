import { useUserInfoStore } from "./userInfoStore";
import incrementSession from "../api/patch/incrementSession";

const initStore = async () => {
    await useUserInfoStore().initUserAuth();
    if(useUserInfoStore().uniqueName) {
        await incrementSession(useUserInfoStore().uniqueName);
    }        
}

export default initStore;