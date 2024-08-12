import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (element) => {
  const app = createApp(Dashboard);
  app.mount(element); // how vue mount
}

if (process.env.NODE_ENV === 'development') {
  const element = document.querySelector('#this-div-in-dashboard-only');
  const isInIsolation = !!element;

  if (isInIsolation) {
    mount(element)
  }
}

export { mount }