<template>
<div class="relative pt-1">
    <div class="flex mb-2 items-center justify-between">
        <div>
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200">
            {{taskName}}
        </span>
        </div>
        <div class="text-right">
        <span class="text-xs font-semibold inline-block text-pink-600">
            {{Math.round(percentage)}}%
        </span>
        </div>
    </div>
    <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200">
        <div :style="{width: `${percentage}%`}" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"></div>
    </div>
</div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"

export default defineComponent({
    name: "ProgressBar",
    props: {
        taskName: {type: String, default: "Loading..."},
        percentage: {type: Number, default: 0},
    }
});
</script>
