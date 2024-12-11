import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { i18n } from "./i18n";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

// Set default locale
i18n.setLocale('en');

// Install Pinia
app.use(pinia);

app.mount("#app");
