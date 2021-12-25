import { createApp } from 'vue'
import App from './App.vue'

import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import './index.css';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOUTuiXtLSUxJbfUO5i8CrRppOHmfLBQE",
  authDomain: "everyonewillbenaked.firebaseapp.com",
  databaseURL: "https://everyonewillbenaked-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "everyonewillbenaked",
  storageBucket: "everyonewillbenaked.appspot.com",
  messagingSenderId: "939955189806",
  appId: "1:939955189806:web:c88ce4e1c9c87ac35687bf",
  measurementId: "G-P2CYG14E90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics);

createApp(App).mount('#app')
