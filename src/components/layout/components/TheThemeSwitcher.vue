<script setup lang="ts">
import { getStorage, saveStorage } from '@/assets/js/storageFunctions';
import { useThemeStore } from '@/stores/themeStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watchEffect } from 'vue';

const themeContent = reactive<{
    id: string,
    label: string,
    icon: string,
}[]>([
    { id: 'light', label: 'Light mode', icon: 'sun' },
    { id: 'dark', label: 'Dark mode', icon: 'moon' },
]);

const themeStore = useThemeStore();
const { currentTheme } = storeToRefs(themeStore);

const userTheme = ref(currentTheme), userThemeLabel = ref<string>('Light mode'), userThemeIcon = ref<string>('sun');

const setTheme = (theme: string) => {
    saveStorage('theme', theme);
    userTheme.value = theme;
    themeStore.setTheme(theme);
},
    toggleTheme = () => {
        if (userTheme.value === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
        if (userTheme.value) {
            themeContent
                .filter((value) => value.id == userTheme.value)
                .map((content) => { return userThemeLabel.value = content.label, userThemeIcon.value = content.icon })
        }
    },
    getMediaPreference = () => {
        const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (hasDarkPreference) {
            return 'dark'
        } else {
            return 'light'
        }
    },
    getTheme = () => {
        return getStorage('theme')
    };

onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference();
    setTheme(initUserTheme);
});

watchEffect(() => {
    if (!userTheme.value) setTheme('light');
    else setTheme(userTheme.value);
    document.documentElement.setAttribute('data-theme', userTheme.value);
});
</script>

<template>
    <button @click="toggleTheme" type="button"
        class="flex flex-row justify-center items-center border-none cursor-pointer w-auto h-auto theme-toggle hover:text-blue-600"
        :class="[userTheme == 'light' ? 'night' : 'day']">
        <span class="sr-only">{{ userThemeLabel }}</span>
        <font-awesome-icon :id="userThemeIcon" :icon="['fas', userThemeIcon]" width="32" height="32"
            class="w-6 h-6"></font-awesome-icon>
    </button>
</template>

<style lang="css" scoped>
.theme-toggle {
    width: calc(var(--element-size) * 0.5);
    height: calc(var(--element-size) * 0.5);
    background-color: rgb(var(--color-background));
    border-radius: 50%;
    transform: translateX(0);
    transition: transform 0.3s ease, background-color 0.5s ease;
}
</style>