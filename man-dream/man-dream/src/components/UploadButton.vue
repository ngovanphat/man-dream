<template>
    <button class=" text-white  font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
    :class="{'cursor-progress flex justify-center': (isLoading || disabled), 'bg-pink-500 hover:bg-pink-700 active:bg-pink-700': !disabled,
     'bg-gray-400 cursor-default': disabled,
     }"
    @click="(!isLoading && !disabled) ? $emit('onClick') : null"
    >
    <div 
    v-if="isLoading"
    class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200"></div>
    <p
    v-else
    >{{text}}</p>
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

<style scoped>
.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
  width: 20px;
  height: 20px;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

