import { createWebHistory, createRouter } from "vue-router";
import home from './components/home.page.vue'
import categories from './components/categories.page.vue'
import places from './components/places.page.vue'
import place from './components/place.page.vue'
import search from './components/search.page.vue'
import parola from './components/parola-del-giorno.page.vue'
import giochi from './components/giochi.page.vue'

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/categorie/:id",
    name: "categories",
    component: categories,
  },
  {
    path: "/contenuti/:cat_id",
    name: "places",
    component: places,
  },
  {
    path: "/contenuto/:id",
    name: "place",
    component: place,
  },
  {
    path: "/cerca/:term/:type",
    name: "search",
    component: search,
  },
  {
    path: "/:pathMatch(.*)",
    name: "catch-all",
    component: home
  },
  {
    path: "/parola",
    name: "parola",
    component: parola
  },
  {
    path: "/giochi",
    name: "giochi",
    component: giochi
  }
  //Aggiungere route sondaggio da collefare poi in giochi.page.vue
  //Aggiungere route caccia al tesoro
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
});

export default router;
