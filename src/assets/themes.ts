import type { Theme } from "../store/themesStore";

export enum ThemesID {
    BLUE = 1,   
    EMERALD = 2,
    PURPLE = 3, 
    AMBER = 4,
    ROSE = 5,
    CYAN = 6,
    SLATE = 7
}

const themes: Theme[] = [
    {
        id: ThemesID.BLUE, 
        base_color: '#35328e',
        border_color: '#413ccd',
        background: '#232236',
    },
    {
        id: ThemesID.EMERALD,
        base_color: '#1a6b54',
        border_color: '#2a9d8f',
        background: '#0d3b33',
    },
    {
        id: ThemesID.PURPLE,
        base_color: '#5e35b1',
        border_color: '#9c4dff',
        background: '#3a1c6b',
    },
    {
        id: ThemesID.AMBER,
        base_color: '#b45309',
        border_color: '#4a220c',
        background: '#78350f',
    },
    {
        id: ThemesID.ROSE,
        base_color: '#be185d',
        border_color: '#ec4899',
        background: '#831843',
    },
    {
        id: ThemesID.CYAN,
        base_color: '#0e7490',
        border_color: '#06b6d4',
        background: '#083344',
    },
    {
        id: ThemesID.SLATE,
        base_color: '#334155',
        border_color: '#64748b',
        background: '#1e293b',
    }
]

export default themes;