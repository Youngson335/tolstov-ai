import { defineStore } from "pinia";
import type { UserInfoModel } from "../components/User/UserInfoModel";
import setNewUser from "../api/post/setNewUser";
import getUserInfoByUniqueName from "../api/get/getUserInfoByUniqueName";

interface StateUserInfo extends UserInfoModel {
    hasUserAuth: boolean | null,    

}

export const useUserInfoStore = defineStore('user-info', {
    state: (): StateUserInfo => ({
        id: null,
        userName: '',
        userSurName: '',
        userFamilyName: '',
        uniqueName: '',
        hasUserAuth: null,        
        createdAt: null,
        updatedAt: null,
        countVisits: null,
        countSentMessages: null
    }),
    actions: {
        async setUserInfo(surName: string, name: string, familyName: string, uniqueName: string) {            
            const userInfoValue = {
                userName: name, 
                userSurName: surName, 
                userFamilyName: familyName,
                uniqueName: uniqueName
            }

            const responseUserModel = await setNewUser(userInfoValue);     
            this.initUserInfo(responseUserModel);

            this.hasUserAuth = true;
        }, 

        async getUserInfo(uniqueName: string) {
            const responseUserModel = await getUserInfoByUniqueName(uniqueName);
            this.initUserInfo(responseUserModel);
        },

        setUniqueNameToLocalStorage(uniqueName: string) {
            localStorage.setItem('uniqueName', uniqueName);
        },

        removeUniqueNameFromLocalStorage() {
            localStorage.removeItem('uniqueName')
        },

        initUserInfo(userModel: UserInfoModel) {            
            if(userModel) {
                this.hasUserAuth = true;

                this.id = userModel.id;
                this.uniqueName = userModel.uniqueName
                this.userFamilyName = userModel.userFamilyName;
                this.userName = userModel.userName;
                this.userSurName = userModel.userSurName;
                this.createdAt = userModel.createdAt;
                this.countSentMessages = userModel.countSentMessages;
                this.countVisits = userModel.countVisits;
                this.updatedAt = userModel.updatedAt;                

                this.setUniqueNameToLocalStorage(userModel.uniqueName);
            } else {
                this.hasUserAuth = false;

                this.id = null;
                this.uniqueName = '';
                this.userFamilyName = '';
                this.userName = '';
                this.userSurName = '';
                this.createdAt = null;
                this.countSentMessages = null;
                this.countVisits = null;
                this.updatedAt = null; 

                this.removeUniqueNameFromLocalStorage();
            }            
        },

        async initUserAuth() {            
            const uniqueName = localStorage.getItem('uniqueName');
            if(uniqueName) {
                await this.getUserInfo(uniqueName);
                this.hasUserAuth = true;
            } else {
                this.hasUserAuth = false;
            }
        }
    }
})