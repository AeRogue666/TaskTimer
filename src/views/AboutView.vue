<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { capitalize } from 'vue';

const { t } = useI18n({});
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-full min-h-screen">
    <h2 class="text-xl font-semibold">{{ capitalize(t('about_title')) }}</h2>
    <section class="flex flex-col justify-center items-center w-full h-auto">
      <p class="text-base my-2">
        {{ capitalize(t('about_part1')) }}
        <span class="font-semibold">VueJS</span>,
        <span class="font-semibold">Tailwind CSS</span> &
        <span class="font-semibold">Vite</span>.
      </p>
      <a class="flex flex-row justify-center items-center w-max mt-4 border-none bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        href="https://aerogue666.github.com/portfolio">
        <font-awesome-icon :icon="['fas', 'plus']" class="fa-xl mx-2"></font-awesome-icon>
        <span class="text-xl font-semibold">{{ capitalize(t('about_moreprojects')) }}</span>
      </a>
    </section>
  </div>
</template>

<style scoped></style>