import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import CustomVuetify from "@/plugin/vuetify/CustomVuetify";
import mitt from 'mitt';

const vuetify = CustomVuetify.generate();

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app')
