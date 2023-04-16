import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";
import translate from "./i18n";
const locales = translate();
const app = createApp(App);
app.config.globalProperties.$locales = locales;
app.use(createPinia());
app.use(router);

app.mount("#app");
