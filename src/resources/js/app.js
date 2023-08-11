import './bootstrap';
import { createApp } from 'vue'
import App from './App.vue'

const vueList = [
  { id: 'app', component: App },
];

vueList.forEach((item) => {
  createApp(item.component).mount(`#${item.id}`);
});