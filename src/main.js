import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import App from './App.vue'

const app = createApp(App)

app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyA86fXUQosI5p7EmrUSrywJQNTG-srF3FA' ,
        // language: 'de',
    },
    autobindAllEvents: true,    
}).mount('#app')

