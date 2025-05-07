<script setup lang="ts">
import { useI18n } from 'petite-vue-i18n';
import TaskListItem from '../ui/TaskListItem.vue';
import { capitalize } from 'vue';

const props = defineProps<{
    completedlist: object | any,
    removedTask: number,
}>(),
    emits = defineEmits<{
        deletecompletedtask: [value: boolean, number],
    }>();

const deleteTask = (value: boolean, id: number) => {
    emits('deletecompletedtask', value, id);
};

const { t } = useI18n({});
</script>

<template>
    <ul v-if="props.completedlist.length !== 0" class="flex flex-col justify-center items-center w-full h-full">
        <li v-for="task of props.completedlist"
            class="flex flex-row justify-between items-center w-full h-full border border-solid px-4 py-2 rounded-lg"
            :key="task.id">
            <TaskListItem>
                <template #data>
                    <div
                        class="flex flex-row justify-center items-center w-auto h-auto min-w-36 min-h-12 p-1 text-gray-600">
                        <font-awesome-icon :icon="['fas', 'check']" class="fa-lg mx-2"></font-awesome-icon>
                        <p class="text-base font-semibold">{{ capitalize(t('completed')) }}</p>
                    </div>
                </template>
                <template #title>
                    {{ task.title }}
                </template>
                <template #button>
                    <div @click.prevent="deleteTask(true, task.id)"
                        class="flex justify-center items-center w-12 h-12 border-none rounded-xl hover:bg-gray-500" :class="[{'removed': task.id === props.removedTask}]">
                        <span class="sr-only">{{ capitalize(t('deleting_task',{task: task.title})) }}</span>
                        <font-awesome-icon :icon="['fas', 'trash-can']" class="fa-xl"></font-awesome-icon>
                    </div>
                </template>
            </TaskListItem>
        </li>
    </ul>
    <div v-else class="flex flex-row justify-center items-center w-full h-auto mt-6">
        <p class="text-xl font-semibold">{{ capitalize(t('nocompletedtask')) }}</p>
    </div>
</template>

<style scoped>
.removed {
    -webkit-animation: fadeinout 3s linear forwards;
    animation: fadeinout 3s linear forwards;
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
</style>