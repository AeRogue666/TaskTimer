<script setup lang="ts">
import { capitalize, onUpdated, reactive, ref } from 'vue';
import AddNewTask from './components/AddNewTask.vue';
import EditTaskContent from './components/EditTaskContent.vue';
import CompletedTasksList from './components/CompletedTasksList.vue';
import TasksUnorderedList from './components/TasksUnorderedList.vue';
import { useI18n } from 'petite-vue-i18n';

const status = ref<string>('waiting'),
    isAddNewTaskOpen = ref<boolean>(false),
    taskName = ref<string>(''),
    isEditTaskOpen = ref<boolean>(false),
    taskValueName = ref<string>(''),
    taskValueId = ref<number>(0),
    result = ref<number>(0),
    newTaskId = ref<number>(0),
    editedTaskId = ref<number>(0),
    removedTaskId = ref<number>(0),
    isTaskDeleted = ref<boolean>(false),
    isTasksCompletedListSelected = ref<boolean>(false);

const tasksList = reactive<{
    id: number,
    title: string,
    status: string,
    icon: string,
    color: string,
}[]>([]),
    tasksCompletedList = reactive<{
        id: number,
        title: string,
        status: string,
    }[]>([]);

const statusList = reactive([
    { code: 'waiting', icon: 'hourglass', color: 'gray' },
    { code: 'progress', icon: 'walking', color: 'orange' },
    { code: 'completed', icon: 'check', color: 'blue' },
]);

const { t } = useI18n({});

const addNewTask = (v: string) => {
    taskName.value = v
    console.log(taskName.value, v)
    createTask(taskName.value);
},
    createTask = (v: string) => {
        const filter = tasksList.filter((content: { title: string; }) => content.title == v);
        if (filter.length === 0 && v) {
            tasksList.push({ id: tasksList.length + 1, title: v, status: 'waiting', icon: 'hourglass', color: 'gray' });
            tasksList.sort((a: { id: number; }, b: { id: number; }) => { return a.id - b.id });
            result.value = 1;
            newTaskId.value = tasksList.length;
        } else {
            result.value = 2;
        }
        console.log(tasksList);
    },
    editTask = (i: number, s?: string | undefined, v?: string | undefined) => {
        if (v && !s) {
            // Edit task title
            tasksList.filter((content: { id: number; title: string; }) => content.id == i && content.title !== v).map((res: { title: string; }) => res.title = v);
            tasksList.sort((a: { id: number; }, b: { id: number; }) => { return a.id - b.id });
            result.value = 3;
        } else if (s && !v) {
            // Edit task status
            if (i === taskValueId.value) {
                const index = tasksList.findIndex(item => item.id === i);
                console.log(index);
                tasksList[index].status = s;
                if (s === 'completed') editedTaskId.value = tasksList[index].id;
                filterStatusTasks();
            }
            tasksList.sort((a: { id: number; }, b: { id: number; }) => { return a.id - b.id });
            result.value = 3;
        } else {
            result.value = 2;
        }
    },
    filterStatusTasks = () => {
        tasksList.map(obj => statusList.filter(item => (item.code === obj.status) && obj.id === taskValueId.value)
            .map(res => {
                if (!obj.icon || !obj.color) {
                    return obj.icon = res.icon, obj.color = res.color
                } else {
                    return obj.icon = res.icon, obj.color = res.color
                }
            })
        );
        console.log('tasks: ', tasksList);
        setTimeout(() => {
            filterTaskCompleted();
        }, 3000);
    },
    filterTaskCompleted = () => {
        tasksList.filter(obj => obj.status === 'completed').map(res => {
            tasksList.splice(tasksList.findIndex(item => item.status === 'completed'), 1); // tasksList.splice(res.id - 1, 1);
            return tasksCompletedList.push({ id: res.id, title: res.title, status: res.status })
        });
    },
    editTaskTitle = (v: string) => {
        taskValueName.value = v
        editTask(taskValueId.value, undefined, taskValueName.value);
    },
    editTaskStatus = (v: string) => {
        status.value = v
        editTask(taskValueId.value, status.value, undefined);
    },
    openEditTaskMenu = (v: number) => {
        isEditTaskOpen.value = true
        tasksList.filter((content: { id: number; }) => content.id == v)
            .map((res: { id: number; title: string; }) => {
                return taskValueId.value = res.id, taskValueName.value = res.title
            });
    },
    deleteTask = (v: boolean) => {
        isTaskDeleted.value = v;
        if (isTaskDeleted.value == true && taskValueId.value !== 0) {
            const index = tasksList.findIndex((i: { id: number; }) => i.id === taskValueId.value);
            if (index > -1) {
                tasksList.splice(index, 1);
                isTaskDeleted.value = false;
                return tasksList
            }
        }
    },
    deleteCompletedTask = (v: boolean, i: number) => {
        if (v == true && i) {
            const index = tasksCompletedList.findIndex(value => value.id === i);
            if (index > -1) {
                removedTaskId.value = i;
                setTimeout(() => {
                    tasksCompletedList.splice(index, 1);
                    return tasksCompletedList
                }, 3000);
            }
        }
    };

onUpdated(() => {
    result.value = 0;
    newTaskId.value = 0;
    editedTaskId.value = 0;
    removedTaskId.value = 0;
});
</script>

<template>
    <div class="flex flex-col items-center w-full h-auto px-12 py-6 rounded-lg">
        <div class="flex flex-col justify-center w-full h-auto py-3 border-none gap-2">
            <h2 class="text-2xl font-semibold">{{ capitalize(t('taskslist_title')) }}</h2>
            <section class="flex flex-col justify-center items-center w-full h-full gap-4">
                <button @click="isAddNewTaskOpen = !isAddNewTaskOpen"
                    class="w-1/2 border-none bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    <font-awesome-icon :icon="['fas', 'plus']" class="fa-xl"></font-awesome-icon>
                    <span class="text-xl font-semibold px-4">{{ capitalize(t('addtask_title')) }}</span>
                </button>
                <div class="flex flex-row justify-center items-center w-full h-auto gap-4">
                    <div class="flex flex-col justify-center items-center">
                        <div class="flex flex-row items-center gap-2">
                            <p class="text-lg font-semibold">{{ capitalize(t('tasks_number')) }}:</p>
                            <div class="text-2xl">
                                <span class="font-semibold">{{ tasksCompletedList.length }}</span>
                                <span> / </span>
                                <span class="font-semibold">{{ tasksList.length + tasksCompletedList.length }}</span>
                            </div>
                        </div>
                        <div class="flex flex-row justify-center items-center w-auto h-auto gap-4">
                            <p>{{ capitalize(t('task_available')) }}: 
                                <span class="font-semibold">{{ tasksList.length }}</span>
                            </p>
                            <p>{{ capitalize(t('task_completed')) }}: 
                                <span class="font-semibold">{{ tasksCompletedList.length }}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row justify-center items-center w-full h-auto gap-2">
                    <button @click="isTasksCompletedListSelected = false"
                        class="flex flex-row justify-center items-center w-auto min-w-64 border-none bg-gray-600 text-white mb-auto px-6 py-3 rounded-lg hover:bg-blue-600">
                        <font-awesome-icon :icon="['fas', 'list']" class="fa-xl"></font-awesome-icon>
                        <span class="text-xl font-semibold px-4">{{ capitalize(t('taskslist_btn')) }}</span>
                    </button>
                    <button @click="isTasksCompletedListSelected = true"
                        class="flex flex-row justify-center items-center w-auto min-w-64 border-none bg-gray-600 text-white mb-auto px-6 py-3 rounded-lg hover:bg-blue-600">
                        <font-awesome-icon :icon="['fas', 'list']" class="fa-xl"></font-awesome-icon>
                        <span class="text-xl font-semibold px-4">{{ capitalize(t('taskscompletedlist_btn')) }}</span>
                    </button>
                </div>
                <div class="block w-full h-auto min-h-60 max-h-60" :class="[{'overflow-y-scroll': isTasksCompletedListSelected && tasksCompletedList.length !== 0}, {'overflow-y-scroll': !isTasksCompletedListSelected && tasksList.length !== 0}]">
                    <TasksUnorderedList v-if="isTasksCompletedListSelected == false" :taskslist="tasksList"
                        :newly-added="newTaskId" :edited-task="editedTaskId" @edittask="openEditTaskMenu" />
                    <CompletedTasksList v-else :completedlist="tasksCompletedList" :removed-task="removedTaskId"
                        @deletecompletedtask="deleteCompletedTask" />
                </div>
                <AddNewTask v-if="isAddNewTaskOpen == true" v-model:is-menu-open="isAddNewTaskOpen"
                    @task-name="addNewTask" :result-value="result" />
                <EditTaskContent v-if="isEditTaskOpen == true" v-model:is-menu-open="isEditTaskOpen"
                    :taskid="taskValueId" :taskname="taskValueName" @updatetaskname="editTaskTitle"
                    :result-value="result" :status="status" @updatestatus="editTaskStatus" @deletetask="deleteTask">
                </EditTaskContent>
            </section>
        </div>
    </div>
</template>

<style scoped></style>