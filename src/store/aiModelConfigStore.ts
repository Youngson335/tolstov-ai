import { defineStore } from "pinia";
import AiModelMode from "../enums/AiModelMode";
import AiModelModeId from "../enums/AiModelModeId";

interface AiModelConfigState {
    aiModeValue: AiModeValue,
}

interface AiModeValue {
    aiMode: AiModelMode,
    aiModeId: AiModelModeId,
}

const useAiModelConfigStore = defineStore('ai-model-config', {
    state: (): AiModelConfigState => ({
        aiModeValue: {
            aiMode: AiModelMode.BASE,
            aiModeId: AiModelModeId.BASE
        }
    }),
    actions: {
        toggleAiConfig(aiModeId: AiModelModeId) {
            if(aiModeId === AiModelModeId.BASE) {
                this.aiModeValue.aiMode = AiModelMode.PRO;                
                this.aiModeValue.aiModeId = AiModelModeId.PRO;
            } else if (aiModeId === AiModelModeId.PRO) {
                this.aiModeValue.aiMode = AiModelMode.BASE;                
                this.aiModeValue.aiModeId = AiModelModeId.BASE;
            }          
            this.setAiConfigToLocalStorage(); 
        },
        setNewAiConfig(aiModeId: AiModelModeId) {                                
            if(aiModeId === AiModelModeId.BASE) {
                this.aiModeValue.aiMode = AiModelMode.BASE;                
                this.aiModeValue.aiModeId = AiModelModeId.BASE;
            } else if (aiModeId === AiModelModeId.PRO) {
                this.aiModeValue.aiMode = AiModelMode.PRO;                
                this.aiModeValue.aiModeId = AiModelModeId.PRO;
            }          
            this.setAiConfigToLocalStorage();  
        },
        setAiConfigToLocalStorage() {
            localStorage.setItem('aiModeValue', JSON.stringify(this.aiModeValue));
        },
        initAiModelMode() {
            const localAiMode = localStorage.getItem('aiModeValue');
            if(!localAiMode) {
                this.setNewAiConfig(AiModelModeId.BASE);
                return;
            }

            const response = JSON.parse(localAiMode) as AiModeValue;
            this.aiModeValue.aiMode = response.aiMode;
            this.aiModeValue.aiModeId = response.aiModeId;
        }
    },
    getters: {
        getAiMode(state) {
            return state.aiModeValue.aiMode;
        },
        getAiModeId(state) {
            return state.aiModeValue.aiModeId;
        }
    }
})

export type { AiModeValue, AiModelConfigState }
export { useAiModelConfigStore }