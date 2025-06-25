import { defineStore } from "pinia";
import type { ChatMessage } from "./messageStore";

interface ResponseMessage {
    id: number,
    response: string,
}

export const useResponsesAIStore = defineStore('ai-store', {
    state: () => ({
        responsesAI: [] as ResponseMessage[],
        isProcess: false,
    }),
    actions: {
        createResponseById(message: ChatMessage) {
            this.isProcess = true;
            console.log(this.isProcess)
            
            const responseId = message.id;
            this.responsesAI.push({
                id: responseId,
                response: 'Я не знаю',
            })            
        },
        toggleProcess() {
            this.isProcess = !this.isProcess;
            console.log(this.isProcess)
        }        
    }
})