<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'petite-vue-i18n';
import { capitalize } from 'vue';

import TheThemeSwitcher from './components/TheThemeSwitcher.vue';
import TheLanguageSwitcher from './components/TheLanguageSwitcher.vue';

const { t } = useI18n({});
const toTheMain = () => {
    const main = document.querySelector('main');
    main?.scrollIntoView({ behavior: 'smooth' });
  };
</script>

<template>
  <header class="block w-full h-auto relative top-0 z-30">
    <section class="flex flex-row items-center w-full max-h-screen pt-4">
      <div class="flex flex-row justify-center items-center w-full">
        <nav>
          <a tabindex="0" @click="toTheMain" @keypress="toTheMain"
            class="sr-only focus:not-sr-only focus:outline outline-inherit outline-offset-1">
            {{ capitalize(t('main_content')) }}
          </a>
        </nav>
        <h1 class="w-full h-auto text-2xl font-semibold px-4">{{ capitalize(t('title')) }}</h1>
        <div class="flex flex-row items-center w-full h-auto">
          <nav class="flex flex-row justify-center items-center" aria-label="Navigation links">
            <RouterLink to="/" class="text-lg">{{ capitalize(t('home')) }}</RouterLink>
            <RouterLink to="/about" class="text-lg">{{ capitalize(t('about')) }}</RouterLink>
          </nav>
        </div>
        <div class="flex flex-row justify-start items-center w-full h-auto">
          <TheThemeSwitcher />
          <TheLanguageSwitcher />
        </div>
      </div>
    </section>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  margin: 0 auto 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    padding-left: calc(var(--section-gap) / 2);
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>