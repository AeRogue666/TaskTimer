<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import { capitalize } from 'vue';
import MenuOpacity from '@/components/ui/MenuOpacity.vue';

const isMenuOpen = defineModel('isMenuOpen'),
    props = defineProps<{
        cycleType: string,
    }>(),
    emits = defineEmits<{
        newCycle: [value: boolean, string],
    }>();

const { t } = useI18n({}),
    closeMenu = () => {
        isMenuOpen.value = false
    },
    startNewCycle = (v: boolean, s: string) => {
        emits('newCycle', v, s);
        closeMenu();
    };
</script>

<template>
    <div v-if="isMenuOpen">
        <div
            class="flex flex-col justify-center items-center w-full h-1/3 border border-solid border-gray-500 rounded-lg notification absolute top-96 z-50">
            <h2 class="text-2xl font-semibold mt-4">{{ capitalize(t('cycle_ended', { type: props.cycleType })) }}</h2>
            <button @click="closeMenu"
                class="flex border-none text-gray-500 rounded-lg absolute top-3 right-3 hover:text-blue-600">
                <font-awesome-icon :icon="['fas', 'xmark']" class="fa-xl"></font-awesome-icon>
            </button>
            <section class="flex flex-col justify-center items-center w-full h-auto mt-4 px-2 gap-1">
                <p class="text-lg font-semibold">{{ capitalize(t('start_new_cycle')) }}?</p>
                <div class="flex flex-row justify-center items-center w-full h-auto gap-2">
                    <button @click.prevent="startNewCycle(true, props.cycleType)"
                        class="inline-flex items-center w-36 h-16 mt-6 px-4 py-2 bg-blue-500 text-2xl font-semibold text-white border-none rounded-xl mb-auto">
                        <font-awesome-icon :icon="['fas', 'check']" class="fa-lg px-4"></font-awesome-icon>
                        {{ capitalize(t('yes')) }}
                    </button>
                    <button @click.prevent="startNewCycle(false, props.cycleType)"
                        class="inline-flex items-center w-36 h-16 mt-6 px-4 py-2 bg-red-500 text-2xl font-semibold text-white border-none rounded-xl mb-auto">
                        <font-awesome-icon :icon="['fas', 'xmark']" class="fa-lg px-4"></font-awesome-icon>
                        {{ capitalize(t('no')) }}
                    </button>
                </div>
            </section>
        </div>
        <MenuOpacity />
    </div>
</template>

<style scoped>
.notification {
    width: 100%;
    left: 0;
    background-color: var(--color-background);
}

@media (min-width: 63rem) {
    .notification {
        width: 50%;
        left: 25%;
    }
}
</style>