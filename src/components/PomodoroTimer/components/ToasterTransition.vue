<script setup lang="ts">
import { useToasterStore, type ToastStatus } from '@/stores/toasterStore';

const toastColorMap: Record<ToastStatus, string> = {
    default: 'color-current',
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};
const toastIconMap: Record<ToastStatus, string> = {
    default: 'plus',
    info: 'circle-info',
    success: 'check',
    warning: 'circle-exclamation',
    error: 'triangle-exclamation',
};
const toasterStore = useToasterStore();
</script>

<template>
    <Teleport to="body">
        <Transition name="toast">
            <div v-show="toasterStore.toasts.length !== 0" class="fixed toaster__wrapper z-50">
                <TransitionGroup name="toast" tag="ul">
                    <li v-for="toast in toasterStore.toasts"
                        :class="['flex items-center border-none bg-transparent px-9 py-6 gap-4', toastColorMap[toast.status]]"
                        :key="toast.text">
                        <font-awesome-icon :icon="['fas', toastIconMap[toast.status]]"
                            class="fa-xl w-7 aspect-square"></font-awesome-icon>
                        <span class="text-xl">
                            {{ toast.text }}
                        </span>
                    </li>
                </TransitionGroup>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.toaster__wrapper {
    bottom: 3%;
    right: 5%;
}

.default {
    color: currentColor;
}

.info {
    color: oklch(0.5461 0.2152 262.88);
}

.success {
    color: oklch(0.6271 0.1699 149.21);
}

.warning {
    color: oklch(0.6461 0.194 41.12);
}

.error {
    color: oklch(0.5771 0.215 27.33);
}
</style>