<template>
    <div class="flex flex-row items-center w-auto h-auto gap-4">
        <slot name="data"></slot>
        <h3 class="text-lg font-semibold">
            <slot name="title"></slot>
        </h3>
    </div>
    <div class="flex flex-row items-center">
        <slot name="button"></slot>
    </div>
</template>