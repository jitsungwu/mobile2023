// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// make sure to also import the coresponding css
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import router from './router'
const vuetify = createVuetify({
  components,
  directives
})

// Make sure to _use_ the router instance to make the
// whole app router-aware.
createApp(App).use(vuetify).use(router).mount('#app')
