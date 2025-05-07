<script setup lang="ts">
import { capitalize, ref, watchEffect } from 'vue';
import TaskListItem from '../ui/TaskListItem.vue';
import { getStorage } from '@/assets/js/storageFunctions';
import { useI18n } from 'petite-vue-i18n';

const props = defineProps<{
    taskslist: object | any,
    newlyAdded: number,
    editedTask: number,
}>(),
    emits = defineEmits<{
        edittask: [value: number]
    }>();
const themeColor = ref<string>('');
const { t } = useI18n({});

const openEditTaskMenu = (value: number) => {
    emits('edittask', value);
};

watchEffect(() => {
    //  console.log(props.newlyAdded, props.editedTask);
    themeColor.value = getStorage('theme');
});
</script>

<template>
    <ul v-if="props.taskslist.length !== 0" class="flex flex-col justify-center items-center w-full h-full gap-2">
        <li v-for="task of props.taskslist"
            class="flex flex-row justify-between items-center w-full h-full border border-solid px-4 py-2 rounded-lg stars"
            :class="[{ 'added': task.id === props.newlyAdded, 'completed': task.id === props.editedTask }, `border-${task.color}-700`]"
            :key="task.id">
            <TaskListItem>
                <template #data>
                    <div class="flex flex-row justify-center items-center w-auto h-auto min-w-36 min-h-12 p-"
                        :class="`text-${task.color}-700`" :key="task.status + task.id">
                        <font-awesome-icon :icon="['fas', task.icon]" class="fa-lg mx-2"></font-awesome-icon>
                        <p class="text-base font-semibold">{{ capitalize(t(task.status)) }}</p>
                    </div>
                </template>
                <template #title>
                    {{ task.title }}
                </template>
                <template #button>
                    <button @click.prevent="openEditTaskMenu(task.id)"
                        class="w-12 h-12 border-none rounded-xl hover:bg-gray-500">
                        <span class="sr-only">{{ capitalize(t('task_settings', {task: task.code})) }}</span>
                        <font-awesome-icon :icon="['fas', 'list']" class="fa-xl"></font-awesome-icon>
                    </button>
                </template>
            </TaskListItem>
            <font-awesome-icon :icon="['fas', 'star']" class="fa-xl star absolute"
                :class="[task.status == 'completed' ? 'visible' : 'hidden']" :style="[themeColor === 'dark' ? 'color: #2563eb;' : 'color: #3b82f6;']"></font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'star']" class="fa-xl star absolute"
                :class="[task.status == 'completed' ? 'visible' : 'hidden']" :style="[themeColor === 'dark' ? 'color: #2563eb;' : 'color: #3b82f6;']"></font-awesome-icon>
            <font-awesome-icon :icon="['fas', 'star']" class="fa-xl star absolute"
                :class="[task.status == 'completed' ? 'visible' : 'hidden']" :style="[themeColor === 'dark' ? 'color: #2563eb;' : 'color: #3b82f6;']"></font-awesome-icon>
        </li>
    </ul>
    <div v-else class="flex flex-row justify-center items-center w-full h-auto mt-6">
        <p class="text-xl font-semibold">{{ capitalize(t('notask')) }}</p>
    </div>
</template>

<style scoped>
.text-orange-700 {
  --tw-text-opacity: 1;
  color: rgb(194 65 12 / var(--tw-text-opacity, 1));
}

.text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}

.text-blue-700 {
  --tw-text-opacity: 1;
  color: rgb(29 78 216 / var(--tw-text-opacity, 1));
}

.border-orange-700 {
  --tw-border-opacity: 1;
  border-color: rgb(194 65 12 / var(--tw-border-opacity, 1));
}

.border-gray-700 {
  --tw-border-opacity: 1;
  border-color: rgb(55 65 81 / var(--tw-border-opacity, 1));
}

.border-blue-700 {
  --tw-border-opacity: 1;
  border-color: rgb(29 78 216 / var(--tw-border-opacity, 1));
}

.added,
.completed {
    -webkit-animation: fadeinout 5s linear forwards;
    animation: fadeinout 5s linear forwards;
}

@-webkit-keyframes fadeinout {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes fadeinout {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

/* Animation for sparkles */

.stars .star {
    --delay-step: 0.15;
    left: calc(var(--x, 0) * 1%);
    transform: translate(-50%, -50%) scale(0);
    animation: sparkle 0.75s calc((var(--delay-step) * var(--d)) * 1s) both;
}

@keyframes sparkle {
    50% {
        transform: translate(-50%, -50%) scale(var(--s, 1));
    }
}

.stars .star:nth-of-type(1) {
    --x: 9;
    --y: 90;
    --s: 1.25;
    --d: 1;
}

.stars .star:nth-of-type(2) {
    --x: 45;
    --y: 95;
    --s: 1.1;
    --d: 2;
}

.stars .star:nth-of-type(3) {
    --x: 90;
    --y: 90;
    --s: 0.8;
    --d: 3;
}
</style>