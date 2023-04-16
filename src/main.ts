import { createApp } from "vue";
import { createPinia } from "pinia";
import { useLocalesStore } from "./stores/locales";
import translate from "./components/i18n";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

const locales = translate();
const store = useLocalesStore();
store.data = locales;

app.mount("#app");
