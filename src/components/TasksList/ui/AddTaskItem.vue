<template>
    <slot name="heading"></slot>
    <div class="flex flex-col items-center w-full h-full mt-12 my-2 mb-auto">
        <slot name="label"></slot>
        <slot name="input"></slot>
    </div>
    <slot></slot>
</template>

<style scoped></style>