<template>
  <div class="page">
    <UploadImage />
  </div>
</template>

<script>
import UploadImage from './components/UploadImage.vue';


export default {
  name: 'App',
  components: {
    UploadImage
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
  background-color: #DAEAFD;

  min-height: 100vh;
}




.page {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 30px 0;
  height: 100%;
}

@media (min-width: 330px) and (max-width: 960px) {
  .page {
    padding: 20px 10px;
  } 
}
</style>
