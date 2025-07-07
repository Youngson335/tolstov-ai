import { defineStore } from "pinia";
import AiModelMode from "../enums/AiModelMode";
import AiModelModeId from "../enums/AiModelModeId";

interface AiModelConfigState {
    aiModeValue: AiModeValue,    
    activeAiDraftId: number | null
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
        },     
        activeAiDraftId: Number(localStorage.getItem('draft-id')) ?? null,   
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
        },
        selectAiDraftId(id: number) {                  
            this.initActiveDraftId(id);
        },
        initActiveDraftId(id: number | null) {
            const DRAFT_ID = 'draft-id';
                        
            let storedId: number | null = null;
            try {
                const rawValue = localStorage.getItem(DRAFT_ID);
                if (rawValue !== null && rawValue !== 'null') {
                    storedId = JSON.parse(rawValue);
                }
            } catch (e) {
                console.error('Failed to parse draft ID from localStorage', e);
                storedId = null;
            }
            
            if (id === null) {
                localStorage.setItem(DRAFT_ID, 'null'); // Явно записываем строку 'null'
                this.activeAiDraftId = null;
                return;
            }
            
            if (id !== undefined && id !== null) {
                localStorage.setItem(DRAFT_ID, JSON.stringify(id));
                this.activeAiDraftId = id;
                return;
            }

            if (storedId !== null ) {
                this.activeAiDraftId = storedId;
            } else {
                this.activeAiDraftId = null;
            }
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