import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const BreakFreeTheme = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#E3F9F8',
            100: '#C1F0ED',
            200: '#99E4E1',
            300: '#6ED7D4',
            400: '#47CBC7',
            500: '#2DC1B8', // base
            600: '#26AAA3',
            700: '#1F8F8A',
            800: '#18736F',
            900: '#115954',
            950: '#0A3D3A',
        },
        secondary: {
            50: '#ECECF4',
            100: '#D5D4EA',
            200: '#BBB9DC',
            300: '#9E9BCB',
            400: '#7F7AB7',
            500: '#2D2A52', // base
            600: '#27244A',
            700: '#211E40',
            800: '#1B1835',
            900: '#14132A',
            950: '#0D0D1F',
        }
    },
    colorScheme: {
        light: {
            surface: {
                0: '#FFFFFF',
                50: '#FBFDFC',
                100: '#F8FCFB',
                200: '#F5FBFA',
                300: '#F3FAF9',
                400: '#F1FAF9',
                500: '#F0FAF9', // base
                600: '#D7E3E1',
                700: '#BBCAC7',
                800: '#9EB0AC',
                900: '#829691',
                950: '#6A7C78',
            }
        },
        dark: {
            surface: {
                0:    '#FFFFFF',
                50:   '#F7F9FA',
                100:  '#EFF2F4',
                200:  '#DDE3E7',
                300:  '#C8D0D6',
                400:  '#A9B4BC',
                500:  '#1C2B36', // base
                600:  '#18252F',
                700:  '#141F28',
                800:  '#101920',
                900:  '#0C1419',
                950:  '#080F12',
            }
        }
    }
});