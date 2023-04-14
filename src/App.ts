import { createApp, defineAsyncComponent } from "vue";
import "./assets/main.css";
import translate from "./i18n";
const locales = translate();
const App = defineAsyncComponent(() => import("./App.vue"));
const app = createApp(App);
app.config.globalProperties.$locales = locales;
app.mount("#app");
