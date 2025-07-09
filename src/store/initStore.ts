import { useUserInfoStore } from "./userInfoStore";
import incrementSession from "../api/patch/incrementSession";
import useThemesStore from "./themesStore";
import { useStatisticsStore } from "./statisticsStore";

const initStore = async () => {
    await useUserInfoStore().initUserAuth();
    if(useUserInfoStore().uniqueName) {
        await incrementSession(useUserInfoStore().uniqueName);
    }      
    useThemesStore().initThemeFromLocalStorage();  
    await useStatisticsStore().initStatistics();
}

export default initStore;