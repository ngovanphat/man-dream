<template>
    <div class="flex justify-center w-full  lg:w-1/2 ">
        <div class="mb-3 w-full">
            <div class="input-group flex  flex-row gap-3 items-stretch  w-full mb-4">
            <input 
            v-model="imageUrl"
            type="search" class="form-control flex-auto min-w-0 block w-3/4 px-3 py-1.5 text-base font-small  lg:font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-pink-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon3">

            <button 
            @click="getImage"
            class="btn px-6 py-2 border-2 border-pink-500 text-pink-500 font-bold text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" type="button" id="button-addon3">Get Image</button>
            </div>
        </div>
    </div>
</template>

<script>
import {  defineComponent,ref } from "@vue/runtime-core";
import { useToast } from "vue-toastification";

export default defineComponent({
    name: "SearchBar",
    setup(props,{emit}) {
        const imageUrl = ref("");
        const toast = useToast();


        function blobToBase64(blob) {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
        }

        function validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
        }
        const getImage = async () => {
            try {
                if(!validURL(imageUrl.value)) throw new Error("Wrong URL! Let input image URL");
                const image = await fetch(imageUrl.value);
                const blob = await image.blob();
                const base64 = await blobToBase64(blob);
                emit('onGetImage', base64);
            }
            catch(e) {
                toast.error(e.toString(), {
                    timeout: 2000
                });
            }
            finally {
                imageUrl.value = ""
            }
        }



        return { imageUrl, getImage };
    }
})
</script>

<style>

</style>