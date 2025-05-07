<template>
    <div class="flex flex-col items-center w-full h-auto">
        <slot name="heading"></slot>
        <div class="flex items-center w-full h-20 border-2 border-solid border-blue-300 rounded-lg">
            <div class="flex flex-col justify-center items-center relative w-full h-full">
                <slot name="labelhours"></slot>
                <slot name="inputhours"></slot>
            </div>
            <span>:</span>
            <div class="flex flex-col justify-center items-center relative w-full h-full">
                <slot name="labelminutes"></slot>
                <slot name="inputminutes"></slot>
            </div>
            <span>:</span>
            <div class="flex flex-col justify-center items-center relative w-full h-full">
                <slot name="labelseconds"></slot>
                <slot name="inputseconds"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped></style>