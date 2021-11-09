import { defineNuxtConfig } from 'nuxt3';
import { resolve } from 'pathe';
export default defineNuxtConfig({
    vite: false,
    alias: {
        images: resolve(__dirname, './assets/images')
    }
});
