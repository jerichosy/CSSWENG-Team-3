import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'material-icons/iconfont/material-icons.css';
// import axios from 'axios';

import '../scss/style.css'

// axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(router)

app.config.unwrapInjectedRef = true
app.mount('#app')
