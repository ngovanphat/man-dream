<template>
   <button 
   @click="$emit('onClick')"
   class="text-pink-500 bg-transparent border border-solid border-pink-500 hover:bg-amber-500 hover:text-white  hover:bg-pink-600 font-bold uppercase text-sm px-6 py-3  rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
      >
        <i class="fas fa-heart"></i> {{text}}
    </button>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "DownloadButton",
    props: {
        text: {type: String, default: ""},
    },
    emits:['onClick']
})
</script>
