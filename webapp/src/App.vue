<!-- 
Template principale della WebApp all'interno del quale vengono visualizzate le pagine <router-view>
-->

<template>
  <div id="wrapper">
    <treasure-hunt-layout v-if="this.$route.meta.layout == 'hunt'" />
    <abgame-layout v-if="this.$route.meta.layout == 'abgame'" />
    <default-layout v-else />
  </div>
    <cookie-gdpr/>
</template>

<script>

import CookieGdpr from './components/cookie-gdpr.component.vue';
import DefaultLayout from './layouts/default.layout.vue';
import TreasureHuntLayout from './layouts/treasure-hunt.layout.vue';
import AbgameHuntLayout from './layouts/abgame.layout.vue';

export default {

    // Definisce variabili globali
    provide: {
        // server nodejs
    // apiUrl: 'https://www.forliviamo.it',
        apiUrl: 'http://localhost:1337'
    },

    components: {
        
        CookieGdpr, DefaultLayout, TreasureHuntLayout
        
    },

}

</script>
