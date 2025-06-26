import { defineStore } from "pinia";
import type { ChatMessage } from "./messageStore";
import { phrasesAi, personalizedRedirectPhrases, aiStickers } from "../phrasesAi";
import { useUserInfoStore } from "./userInfoStore";

interface ResponseMessage {
    id: number,
    response: string,
}

export const useResponsesAIStore = defineStore('ai-store', {
    state: () => ({
        responsesAI: [] as ResponseMessage[],
        isProcess: false,
        messageCounter: 0,
    }),
    actions: {
        getRandomResponse(): string {
            const userStore = useUserInfoStore();
                        
            this.messageCounter++;
                        
            if (this.messageCounter >= 3 && Math.random() < 0.3) {
                this.messageCounter = 0; 
                const randomSticker = aiStickers[Math.floor(Math.random() * aiStickers.length)];
                return randomSticker; 
            }
                        
            if (userStore.isUser && Math.random() > 0.7) {
                const randomPersonalized = personalizedRedirectPhrases[Math.floor(Math.random() * personalizedRedirectPhrases.length)];
                return `${userStore.userName}${randomPersonalized}`;
            }
                        
            return phrasesAi[Math.floor(Math.random() * phrasesAi.length)];
        },
        createResponseById(message: ChatMessage) {
            this.isProcess = true;
            
            const responseId = message.id;
            
            this.responsesAI.push({
                id: responseId,
                response: this.getRandomResponse(),
            });            
        },
        toggleProcess() {
            this.isProcess = !this.isProcess;
        }        
    }
})