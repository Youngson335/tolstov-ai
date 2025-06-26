import { defineStore } from 'pinia';
import { useResponsesAIStore } from './responsesAIStore';

export interface ChatMessage {
  id: number;
  messages: string[];
}

const aiStore = useResponsesAIStore();

export const useChatStore = defineStore('chat', {
  state: () => ({
    chatHistory: [] as ChatMessage[],
    currentMessages: [] as string[],
    nextId: 1,
  }),

  actions: {    
    addMessageToCurrent(text: string) {
      if (!text.trim()) return;
      this.currentMessages = [...this.currentMessages, text];
    },
    
    saveCurrentMessages() {
      if (this.currentMessages.length === 0) return;      
      
      this.chatHistory.push({
        id: this.nextId++,
        messages: [...this.currentMessages],
      });

      aiStore.createResponseById({
        id: this.nextId - 1,
        messages: [...this.currentMessages],
      })      
      
      this.currentMessages = [];
    },
    
    clearCurrentMessages() {
      this.currentMessages = [];
    },    

    clearAllHistoryMessages() {
      this.chatHistory = [];
    }
  },

  getters: {    
    getAllChats: (state) => state.chatHistory,
  },
});