import { defineStore } from 'pinia';
import { useResponsesAIStore } from './responsesAIStore';
import { useAiModelConfigStore } from './aiModelConfigStore';
import AiModelMode from '../enums/AiModelMode';
import { computed } from 'vue';


const aiStore = useResponsesAIStore();
const aiModelConfigStore = useAiModelConfigStore();

const aiMode = computed((): AiModelMode => {
  return aiModelConfigStore.getAiMode;
});

export interface ChatMessage {
  id: number;
  messages: string[];
}

interface ChatStoreState {
  chatHistory: ChatMessage[],
  currentMessages: string[],
  nextId: number,
  countMessages: number
}

export const useChatStore = defineStore('chat', {
  state: (): ChatStoreState => ({
    chatHistory: [] as ChatMessage[],
    currentMessages: [] as string[],
    nextId: 1,
    countMessages: Number(localStorage.getItem('count-sent-messages')) ?? 0 
  }),

  actions: {    
    addMessageToCurrent(text: string) {      
      if (!text.trim()) return;
      this.currentMessages = [...this.currentMessages, text];
    },
    
    saveCurrentMessages(question: string) {      
      if (this.currentMessages.length === 0) return;      
      
      this.chatHistory.push({
        id: this.nextId++,
        messages: [...this.currentMessages],
      });
            
      if(aiMode.value === AiModelMode.BASE) {        
        aiStore.createResponseById({
          id: this.nextId - 1,
          messages: [...this.currentMessages],
        });
      } else if(aiMode.value === AiModelMode.PRO) {
          aiStore.setNewAnswer({
            id: this.nextId - 1,
            messages: [...this.currentMessages],
          }, question)
      }

      this.saveCountMessageToLocalStorage(this.countMessages + 1);
      
      this.currentMessages = [];
    },
    
    clearCurrentMessages() {
      this.currentMessages = [];
    },    

    clearAllHistoryMessages() {
      this.chatHistory = [];
    },

    saveCountMessageToLocalStorage(countMessages: number) {
      localStorage.setItem('count-sent-messages', JSON.stringify(countMessages));
      this.countMessages++;
    }
  },

  getters: {    
    getAllChats: (state) => state.chatHistory,
  },
});