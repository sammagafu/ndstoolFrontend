import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import './assets/main.css'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import PrimeVue from 'primevue/config';
import Toast from 'primevue/toast';
import Steps from 'primevue/steps';
import ToastService from 'primevue/toastservice';


axios.defaults.baseURL = 'http://localhost:8000/api/v1/'

const app = createApp(App)



app.use(createPinia())
app.use(router)
app.use(ToastService);
app.use(PrimeVue);
app.use(VueAxios,axios)

app.component('Toast', Toast);
app.component('Steps',Steps)

app.mount('#app')
