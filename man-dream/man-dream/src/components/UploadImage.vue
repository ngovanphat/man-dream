<template>
  <div class="white-container">
    <input 
    accept="image/png, image/jpeg"
    placeholder="Click to upload file"
    type="file" @change="onUploadFile"
    :disabled="isProcessing"
    />
    <div class="row">
      <img 
      v-if="file"
      :src="file" alt="upload image"
      class="image"
      >
      <div class="space"></div>
      <img v-if="processedImage" 
      :src="processedImage"
      alt="processed Image"
      class="image"
      />
    </div>  
  </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core"
import { ref, watch } from "vue";
import * as FirebaseStorage from "firebase/storage";
import * as FirebaseDatabase from "firebase/database";
import { getStorage,  uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getDatabase, set, push, child, onValue } from "firebase/database";

export default defineComponent({
  name: 'UploadImage',
  setup() {
    const file = ref(null);
    const processedImage = ref(null);
    const isProcessing = ref(false);

    const storage = getStorage();
    const database = getDatabase();

    const postKey = ref("");



    const onUploadFile = (e) => {
     const uploadFile = e.target.files[0];
     file.value = URL.createObjectURL(uploadFile);
     processFile(uploadFile);
    }

    const processFile = async (file) => {
      try {
        isProcessing.value = true;

        const filePath = `/unnude/${Date.now()}-${file.name}`;
        const uploadUnprocessImageRef = FirebaseStorage.ref(storage,`${filePath}${file.name}`);
        const uploadTask = uploadBytesResumable(uploadUnprocessImageRef, file);


        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            throw new Error(error);
          }, 
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              writeToRealtimeDb({
                ewbn_id: 1,
                image_url: downloadURL,
                process_Flag: false,
                user_token: '1'
              })
            });
          }
        );
      }
      catch(e) {
        console.log(e);
      }
      finally {
        isProcessing.value = false;
      }
    }

    const writeToRealtimeDb = ({ewbn_id, image_url, process_Flag, user_token}) => {
      const newPostKey = push(child(FirebaseDatabase.ref(database), 'wanna_nude_queue')).key;
      postKey.value = newPostKey;
      set(
      FirebaseDatabase.ref(database,'/wanna_nude_queue/'+ newPostKey), 
      JSON.parse(JSON.stringify({
        ewbn_id: ewbn_id,
        image_url: image_url,
        process_Flag: process_Flag,
        user_token: user_token
      })));
    };

    const beginWatchImage = (id) => {
      processedImage.value = null;
      const imageRef = FirebaseDatabase.ref(database,'wanna_nude_queue/'+id);
      onValue(imageRef, (snapshot) => {
        const data = snapshot.val();
        if(String(data.process_Flag) == 'true') processedImage.value=data.image_url;
      })
    };

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
      processedImage
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.white-container {
  width: 800px;
  height: 600px;

  border-radius: 8px;
  background-color: blanchedalmond;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.space {
  width: 10px;
}

input {
  font-size: 24px;
}

.image {
  width: 400px;
  height: 400px;
}




h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
