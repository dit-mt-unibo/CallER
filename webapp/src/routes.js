import { createWebHistory, createRouter } from "vue-router";
import home from './components/home.page.vue'
import categories from './components/categories.page.vue'
import places from './components/places.page.vue'
import place from './components/place.page.vue'
import search from './components/search.page.vue'
import glossary from './components/glossary.page.vue'
import game from './components/game.page.vue'
import abquestion from './components/abquestion.page.vue'

import TreasureHome from './views/treasure-hunt/HomeView.vue';
import TreasureIntro from './views/treasure-hunt/IntroView.vue';
import TreasureStage from './views/treasure-hunt/StageView.vue';
import TreasureCompleted from './views/treasure-hunt/CompletedView.vue';
import TreasureError from './views/treasure-hunt/ErrorView.vue';

import games from './components/games.page.vue'

import AbgameHome from './views/abgame/HomeView.vue';
import AbgameIntro from './views/abgame/IntroView.vue';
import AbgamePair from './views/abgame/PairView.vue';
import AbgameCompleted from './views/abgame/CompletedView.vue';
import AbgameError from './views/abgame/ErrorView.vue';

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/giochi",
    name: "giochi",
    component: games,
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
    path: "/parola-del-giorno",
    name: "glossary",
    component: glossary
  },

  // Sezione caccia al tesoro

  {
    path:"/caccia-al-tesoro",
    component: TreasureHome,
    meta: { layout: "hunt" },
  },
  {
    path: "/caccia-al-tesoro/intro",
    component: TreasureIntro,
    meta: { layout: "hunt" },
  },
  {
    path: "/caccia-al-tesoro/tappe",
    component: TreasureStage,
    meta: { layout: "hunt" },
  },
  {
    path: "/caccia-al-tesoro/completata",
    component: TreasureCompleted,
    meta: { layout: "hunt" },
  },
  {
    path: "/caccia-al-tesoro/errore",
    component: TreasureError,
    meta: { layout: "hunt" },
  },
  // Sezione gioco A/B
  {
    path: "/gioco-ab/:id",
    component: AbgameHome,
    meta: { layout: "abgame" },
  },
  {
    path: "/abgame/:id",
    name: "abgame",
    component: game,
  },
  {
    path: "/gioco-ab/intro",
    component: AbgameIntro,
    meta: { layout: "abgame" },
  },
  {
    path: "/gioco-ab/domande",
    component: AbgamePair,
    meta: { layout: "abgame" },
  },
  {
    path: "/gioco-ab/completata",
    component: AbgameCompleted,
    meta: { layout: "abgame" },
  },
  {
    path: "/gioco-ab/errore",
    component: AbgameError,
    meta: { layout: "abgame" },
  },
  {
    path: "/abquestion/:id",
    name: "abquestion",
    component: abquestion,
  },
];

const router = createRouter({
  history: createWebHistory(),
  base: process.env.BASE_URL,
  routes
});

export default router;
