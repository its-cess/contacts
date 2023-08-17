import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router/index.js";
import App from "./App.vue";
import { vMaska } from "maska";

createApp(App)
  .use(createPinia())
  .use(router)
  .directive("maska", vMaska)
  .mount("#app");
