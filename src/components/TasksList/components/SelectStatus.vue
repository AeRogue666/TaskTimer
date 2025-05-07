<script setup lang="ts">
import { getStorage } from '@/assets/js/storageFunctions';
import { useI18n } from 'petite-vue-i18n';
import { capitalize, reactive, ref, watchEffect } from 'vue';

const statusValue = defineModel('statusCode', { required: true }),
    isOpen = ref<boolean>(false),
    status = reactive<{
        id: number,
        code: string,
        icon: string,
    }[]>([]),
    statusList = reactive([
        { id: 1, code: 'waiting', icon: 'hourglass' },
        { id: 2, code: 'progress', icon: 'walking' },
        { id: 3, code: 'completed', icon: 'check' },
    ]),
    textColor = ref<string>('');

const { t } = useI18n({});

const filterStatusList = (value: string | undefined | unknown) => {
    statusList.filter(v => v.code == value).map(res => status.push(res));
},
    setStatus = (value: string) => {
        statusValue.value = value;
    };

watchEffect(() => {
    status.splice(0, status.length);
    if (statusValue.value) filterStatusList(statusValue.value);
    textColor.value = getStorage('theme');
});
</script>

<template>
    <div
        class="flex flex-row justify-center items-center w-1/2 h-auto min-w-36 min-h-12 mt-2 text-center border solid rounded-lg relative">
        <button v-for="status in status" @click="isOpen = !isOpen" :value="status.code" :aria-expanded="isOpen"
            :aria-label="status.code" :key="status.id"
            class="block w-full h-auto p-1 text-xl font-semibold color-nav-link"
            :class="[textColor == 'dark' ? 'text-white' : 'text-black']">
            <font-awesome-icon :icon="['fas', status.icon]" class="fa-lg"></font-awesome-icon>
            {{ capitalize(t(status.code)) }}
        </button>
        <div class="w-0 h-0 arrow absolute right-1" :class="[isOpen == true ? 'arrow-up' : 'arrow-down']"></div>
        <div v-if="isOpen == true"
            class="flex flex-col justify-center items-center w-full h-auto min-w-36 min-h-12 status border solid rounded-lg -mt-0.5 absolute top-12 z-50">
            <button v-for="status of statusList" @click="setStatus(status.code)" :value="status.code"
                :aria-label="status.code" :key="status.id"
                class="block w-full h-full min-h-12 p-1 text-xl font-semibold relative"
                :class="[textColor == 'dark' ? 'text-white' : 'text-black']">
                <font-awesome-icon :icon="['fas', status.icon]" class="fa-lg px-4"></font-awesome-icon>
                {{ capitalize(t(status.code)) }}
            </button>
        </div>
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

.status {
    background-color: var(--color-background);
}
</style>