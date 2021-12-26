<template>
  <label for="toggle-example" class="flex items-center cursor-pointer relative mb-4">
    <input 
    @input="$emit('onChange', !status)"
    v-model="status"
    type="checkbox" id="toggle-example" class="sr-only">
    <div class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
  <span class="ml-3 text-gray-900 text-sm font-medium prose-h4">{{label}}</span>
</label>
</template>

<script>
import { defineComponent, watch, ref } from "@vue/runtime-core";

export default defineComponent({
    name: "Switch",
    props: {
        label: {type: String, default: ""},
        isChecked: {type: Boolean, default: false},
    },
    emits: ['onChange'],
    setup(props) {
        const status = ref(props.isChecked);
        watch(
            () => props.isChecked,
            (val) => {status.value = val;}
        );

        return {status};
    }
})
</script>

<style>
.toggle-bg:after {
    content: '';
    @apply absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm;
}

input:checked + .toggle-bg:after {
    transform: translateX(100%);
    @apply border-white;
}

input:checked + .toggle-bg {
    @apply bg-blue-600 border-blue-600;
}
</style>
