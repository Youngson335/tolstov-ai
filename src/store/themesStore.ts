import { defineStore } from "pinia";
import themes from "../assets/themes";
import { ThemesID } from "../assets/themes";

export interface Theme {
    id: ThemesID, 
    base_color: string,
    border_color: string,
    background: string,
}

interface ThemesStoreState {
    themes: Theme[],
    activeTheme: Theme

}

const ACTIVE_THEME = 'active-theme';


const useThemesStore = defineStore('theme', {
    state: (): ThemesStoreState => ({
        themes: themes,
        activeTheme: themes[0],
    }),
    actions: {
        initTheme(id: number) {
            const theme = this.themes.find((item: Theme) => {
                return item.id === id;
            })
            if(theme) {
                this.activeTheme = theme;
                this.setThemeForLocalStorage(this.activeTheme.id);
            } else {
                this.activeTheme = this.themes[0];
                this.setThemeForLocalStorage(this.themes[5].id);                
            }
        },
        setThemeForLocalStorage(id: number)  {
            localStorage.setItem(ACTIVE_THEME, String(id));
        },
        initThemeFromLocalStorage() {
            const localThemeId = localStorage.getItem(ACTIVE_THEME);
            if(localThemeId) {
                this.initTheme(Number(localThemeId));
            } else {
                this.setThemeForLocalStorage(this.themes[5].id)
                this.activeTheme = this.themes[5];                
            }
        },
        applyNewTheme() {
            const root = document.documentElement;
            root.style.setProperty("--base-color", this.activeTheme.base_color);
            root.style.setProperty(
            "--base-border-color",
            this.activeTheme.border_color
            );
            root.style.setProperty("--base-background", this.activeTheme.background);
        }
    }
})

export default useThemesStore;