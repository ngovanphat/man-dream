<template>
  <div class="page">
    <UploadImage msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import UploadImage from './components/UploadImage.vue'

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

  height: 100vh;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
}
</style>
