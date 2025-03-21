import { createApp } from 'vue'
import dayjs from 'dayjs'
import { createPinia } from 'pinia';

import './style.css'
import App from './App.vue'
import router from './router'
import store from './stores/store.ts';


const app = createApp(App);
const pinia = createPinia();
app.use(router);

app.directive("format-date", {
    mounted(el, binding) {
        formatText(el, binding);
    },
    updated(el, binding) {
        formatText(el, binding);
    },
});

function formatText(el, binding) {
    const format = binding.value || "YYYY-MM-DD";
    el.textContent = dayjs(el.textContent.trim()).format(format);
}
app.use(store);
app.use(pinia);
app.mount("#app");
