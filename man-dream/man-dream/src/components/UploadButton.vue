<template>
    <button class=" text-white  font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
    :class="{'cursor-progress': (isLoading || disabled), 'bg-pink-500 hover:bg-pink-700 active:bg-pink-700': !disabled,
     'bg-gray-400 cursor-default': disabled,
     }"
    @click="(!isLoading && !disabled) ? $emit('onClick') : null"
    >
    <i class="fas fa-heart"></i> {{text}}
    </button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "UploadButton",
    props: {
        isLoading: {type: Boolean, default: false},
        disabled: {type: Boolean, default: false},
        text: {type: String, default: ""},
    },
    emits:['onClick']
})
</script>
