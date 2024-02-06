import { createApp } from 'vue'
import App from './App.vue'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import router from "./router"
import mitt from 'mitt';
const emitter = mitt();

import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

const app = createApp(App)
  .use(createVuestic())
  .use(router);
app.config.globalProperties.emitter = emitter;
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
