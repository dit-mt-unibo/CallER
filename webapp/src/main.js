import { createApp } from 'vue'
import { VueUmamiPlugin } from '@jaseeey/vue-umami-plugin';
import App from './App.vue';
import router from './routes';

const app = createApp(App);

app.use(VueUmamiPlugin, {
  websiteID: 'a5c95fed-e131-4a43-9c47-04437a921ef7',
  scriptSrc: 'https://us.umami.is/script.js', // Optional
  router,
  allowLocalhost: true,
  // Optional arguments to be added to the Umami script tag, 
  // as specified in Umami documentation, see
  // https://umami.is/docs/tracker-configuration
  // extraDataAttributes: {
  //     'data-host-url': 'http://stats.mywebsite.com',
  //     'data-domains': 'mywebsite.com,mywebsite2.com',
  //     ... etc.
  // }
});

app.use(router).mount('#app');

//era: createApp(App).use(router).mount('#app')
