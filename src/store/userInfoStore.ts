import { defineStore } from "pinia";
import type UserInfo from "../components/User/UserInfo";

interface StateUserInfo extends UserInfo {
    isUser: boolean
}

export const useUserInfoStore = defineStore('user-info', {
    state: (): StateUserInfo => ({
        userName: '',
        userSurName: '',
        userFamilyName: '',
        isUser: false
    }),
    actions: {
        setUserInfo(surName: string, name: string, familyName: string) {
            this.userName = name;
            this.userSurName = surName;
            this.userFamilyName = familyName;

            localStorage.setItem('user-info', JSON.stringify({
                userName: this.userName, 
                userSurName: this.userSurName, 
                userFamilyName: this.userFamilyName
            }))

            this.isUser = true;
        },
        initUserInfo() {
            const hasUserInfo = localStorage.getItem('user-info');
            if(hasUserInfo) {
                const userInfoParse = JSON.parse(hasUserInfo) as UserInfo;
                
                this.userName = userInfoParse.userName;
                this.userSurName = userInfoParse.userSurName;
                this.userFamilyName = userInfoParse.userFamilyName;

                this.isUser = true;
            } else {
                this.isUser = false;
            }
        }
    }
})