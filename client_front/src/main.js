import '@mdi/font/css/materialdesignicons.css';
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';
import 'vuetify/styles';
import App from './App.vue';

const vuetify = createVuetify({
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
            fa,
        },
    },
});

const app = createApp(App);
app.use(vuetify); 
app.mount('#app');