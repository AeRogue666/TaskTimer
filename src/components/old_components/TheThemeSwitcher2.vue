<script setup lang="ts">
import { saveStorage } from '@/assets/js/storageFunctions';
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { reactive, watch } from 'vue';

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);
const updateTheme = (theme: string) => {
    themeStore.setTheme(theme);
};
const themeValues = reactive<{
    id: number,
    value: string,
    label: string,
}[]>([
    { id: 1, value: 'light', label: 'Light mode' },
    { id: 2, value: 'dark', label: 'Dark mode' },
]);


watch(currentTheme, (newTheme: string) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    saveStorage('theme', newTheme);
});
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-auto">
        <ul class="flex flex-col justify-center items-center w-full h-auto gap-4">
            <li v-for="theme in themeValues" :key="theme.id">
                <label class="sr-only">{{ theme.label }}</label>
                <input type="radio" name="theme" :value="theme.value" @change="updateTheme(theme.value)" :checked="currentTheme === theme.value">
            </li>
        </ul>
    </div>
</template>

<style scoped></style>