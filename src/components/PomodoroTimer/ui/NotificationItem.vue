<template>
    <div class="flex flex-col justify-center items-center w-full h-full">
        <div class="flex flex-row items-center">
            <slot name="icon"></slot>
            <slot name="title"></slot>
            <slot name="button"></slot>
        </div>
        <section class="flex flex-col justify-center items-center w-full h-full mt-4 px-2 gap-4">
            <slot></slot>
        </section>
    </div>
</template>