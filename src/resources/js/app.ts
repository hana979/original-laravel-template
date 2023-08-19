// import './bootstrap';
import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { createVuetify } from "vuetify";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';

import "vuetify/dist/vuetify.min.css";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css"; 

const vuetify = createVuetify();
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue') as any),
    setup({ el, App, props, plugin }) {
        createApp({
                progress: { color: '#4B5563'},
                render: () => h(App, props)
            })
            .use(plugin)
            .use(ZiggyVue, Ziggy)
            .use(vuetify) //追加
            .mount(el);
    },
});