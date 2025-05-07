<script setup lang="ts">
import { saveStorage } from '@/assets/js/storageFunctions';
import { useLanguageStore } from '@/stores/languageStore';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue';

const languageStore = useLanguageStore(),
    { currentLanguage } = storeToRefs(languageStore),
    isOpen = ref(false),
    Language = ref('');

const languageValues = reactive<{
    id: number,
    value: string,
    title: string,
}[]>([
    { id: 1, value: 'en', title: 'English' },
    { id: 2, value: 'fr', title: 'Français' },
]);

const setLanguage = (language: string) => {
    languageValues.filter(v => v.value == language).map(res => Language.value = res.title)
},
    updateLanguageValue = (language: string) => {
        languageStore.setNewLanguage(language);
    };

onMounted(() => {
    if (currentLanguage.value) setLanguage(currentLanguage.value);
})

watch(currentLanguage, (newLang: string) => {
    document.documentElement.lang = newLang;
    saveStorage('language', newLang);
    setLanguage(newLang);
});
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full h-auto">
        <button @click="isOpen = !isOpen" class="flex flex-row items-center w-auto h-auto p-1 text-xl font-semibold hover:text-blue-600"
            :aria-expanded="isOpen">
            {{ Language }}
            <div class="w-0 h-0 mx-2 arrow" :class="[isOpen == true ? 'arrow-up' : 'arrow-down']"></div>
        </button>
        <ul v-if="isOpen == true"
            class="flex flex-col justify-center items-center w-max h-auto min-w-32 min-h-16 bg border solid rounded-lg absolute top-12">
            <li v-for="lang in languageValues"
                class="block w-full h-auto text-center min-h-12 mx-2 p-1 text-base font-semibold rounded-lg relative hover:bg-blue-600 hover:text-white"
                @click.prevent="updateLanguageValue(lang.value)" :key="lang.id">
                <input type="radio" name="theme" class="appearance-none" :value="lang.value">
                <label class="text-xl font-semibold">{{ lang.title }}</label>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.arrow {
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
}

.arrow-up {
    border-bottom: 0.3rem solid;
}

.arrow-down {
    border-top: 0.3rem solid;
}

.bg {
    background-color: var(--color-background);
}
</style>