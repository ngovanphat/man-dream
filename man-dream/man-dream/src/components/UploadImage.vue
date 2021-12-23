<template>
  <div class="white-container">
   
      <input 
      accept="image/png, image/jpeg"
      placeholder="Click to upload file"
      type="file" @change="onUploadFile"
      ref="input"
      :disabled="isProcessing"
      />
      <div 
      class="upload-container"
      @dragleave.prevent="() => {}"
      @dragover.prevent="() => {}"
      @drop.prevent="!isProcessing ? onUploadFile($event) : null"
      dropzone="true"
      >
        <vue-picture-cropper
          :boxStyle="{
            width: '80%',
            height: '80%',
            backgroundColor: '#f8f8f8',
            margin: 'auto'
          }"
          :img="file"
          :options="{
            viewMode: 1,
            dragMode: 'crop',
            aspectRatio: 1 / 1,
            preview: file,
            cropBoxResizable: true,
          }"
          class="upload-image-icon"
        />
        <p class="upload-image-text">Drop your image here, or <span 
        @click="clickToUpload"
        class="upload-image-link"
        :class="{'default-pointer': isProcessing}"
        >Browse</span></p>
      </div>

      <div 
      @click="!isProcessing ? uploadToServer() : null"
      :class="{'default-pointer': isProcessing}"
      class="submit-btn">
        Upload
      </div>

    


    <div class="progress-bar">
      <div 
      :style="{
        width: `${processPercent}%`
      }"
      class="running-bar"></div>
    </div>
    



    <div 
    v-if="processedImage">
      <img 
      :src="processedImage"
      alt="processed Image"
      class="image"
      />

      <p 
      @click="download"
      class="upload-image-link">Download Image !</p>
    </div>  
  </div>
</template>

<script>

import { defineComponent } from "@vue/runtime-core"
import { ref, watch } from "vue";
import * as FirebaseDatabase from "firebase/database";
import { getDatabase, onValue } from "firebase/database";
import VuePictureCropper, { cropper } from 'vue-picture-cropper'




import Helper from '../lib/helpers';

export default defineComponent({
  name: 'UploadImage',
  components: {
    VuePictureCropper,
  },
  setup() {
    const file = ref(null);
    const processedImage = ref(null);
    const isProcessing = ref(false);

    const database = getDatabase();

    const postKey = ref("");
    const processPercent = ref(0);

    const {
      uploadToStorage,
      writeToDatabase
    } = Helper();


    const onUploadFile = (e) => {
      const files = e.target.files ||  e.dataTransfer.files;
      const uploadFile = files[0];
      file.value = URL.createObjectURL(uploadFile);
    }

    const uploadToServer = async () => {
      const file = await cropper.getFile();

      processFile(file)
    }
    const processFile = async (file) => {
      try {
        isProcessing.value = true;

        const filePath = `/unnude/${Date.now()}-${file.name}`;
        const imageUrl = await uploadToStorage(filePath, file);
        // console.log(imageUrl);
        postKey.value = await writeToDatabase({
          created_time: new Date().toLocaleString(),
          image_url: imageUrl,
          process_Flag: false,
          file_name: file.name
        })
      }
      catch(e) {
        console.log(e);
      }
    }
    const beginWatchImage = (id) => {
      processedImage.value = null;
      processPercent.value = 0;
      const runningProcess = setInterval(() => {
        processPercent.value = processPercent.value + 1.65;
        if(processPercent.value >= 98) clearInterval(runningProcess);
      },1000);

      const imageRef = FirebaseDatabase.ref(database,'wanna_nude_queue/'+id);
      onValue(imageRef, (snapshot) => {
        const data = snapshot.val();
        if(String(data.process_Flag) == 'true'){
          isProcessing.value = false;
          if(runningProcess) clearInterval(runningProcess);
          processPercent.value = 100;
          processedImage.value=data.image_url;
        }
      })
    };

    const log = (e) => console.log(e); 


   

    watch(
      () => postKey.value,
      (val) => {
        beginWatchImage(val);
      }
    );

    return {
      file,
      onUploadFile,
      isProcessing,
      processedImage,
      processPercent,
      uploadToServer,
      log,


    }
  },
  methods: {
    clickToUpload() {
      this.$refs.input.click();
    },
    download() {
      const downloadLink = document.createElement("a");
      downloadLink.href=`${this.processedImage}`;
      downloadLink.target="_blank";
      downloadLink.download = this.file.name;
      downloadLink.click();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.white-container {
  width: 800px;
  height: 850px;

  padding: 20px;
  border-radius: 16px;
  background-color: white;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.upload-container {
  width: 80%;

  height: 400px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px dashed #95a8c0;
  border-radius: 10px;
}

.upload-image-icon {
  width: 300px;
  height: 300px;
  border: 1px solid rgba(85,85,85,0.1);
}

.upload-image-text {
  font-weight: 500;
  font-size: 16px;

}

.upload-image-link {
  font-weight: bold;
  color: rgb(135, 135, 245);
  cursor: pointer;
}

.submit-btn {

  margin-top: 10px;
  width: 250px;
  height: 40px;
  background-color: #d67ad9;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
}

.default-pointer {
  cursor: default;
}

.progress-bar {
  height: 10px;
  width: 100%;
  border: 1px solid blue;
  border-radius: 4px;
  margin-top: 10px;
}

.running-bar{
  background-color: red;
  height: 100%;
}

input {
  font-size: 24px;

  display: none;
}

.image {
  margin-top: 10px;
  width: 300px;
  height: 300px;
  border: 1px solid rgba(85,85,85,0.1);
}
</style>
