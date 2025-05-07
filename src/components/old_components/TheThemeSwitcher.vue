<script setup lang="ts">
import { getStorage, saveStorage } from '@/assets/js/storageFunctions';
import { onMounted, reactive, ref, watchEffect } from 'vue';

const props = defineProps<{
    themeColor: string,
}>(),
    emits = defineEmits<{
        update: [value: string],
    }>();
const themeContent = reactive<{
    id: string,
    label: string,
}[]>([
    { id: 'light', label: 'The site will be switched to dark theme' },
    { id: 'dark', label: 'The site will be switched to light theme' },
]);
const userTheme = ref<string>(''), userThemeLabel = ref<string>('The site will be switched to light theme'), userThemeIcon = ref<string>('moon');

const setTheme = (theme: string) => {
    emits('update', theme);
    saveStorage('user-theme', theme);
    userTheme.value = theme;
},
    toggleTheme = () => {
        if (userTheme.value === 'light') {
            setTheme('dark');
            userThemeIcon.value = 'sun';
        } else {
            setTheme('light');
            userThemeIcon.value = 'moon';
        }
        if (userTheme.value) {
            themeContent
                .filter((value) => value.id == userTheme.value)
                .map((content) => userThemeLabel.value = content.label)
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
        return getStorage('user-theme')
    };

onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference();
    setTheme(initUserTheme);
});

watchEffect(() => {
    if (!userTheme.value) setTheme(props.themeColor);
    else setTheme(userTheme.value);
});
</script>

<template>
    <button @click="toggleTheme" type="button"
        class="flex flex-row justify-center items-center border-none cursor-pointer w-auto h-auto theme-toggle"
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