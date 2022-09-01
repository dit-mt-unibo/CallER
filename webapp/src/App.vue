<!-- 
Template principale della WebApp all'interno del quale vengono visualizzate le pagine <router-view>
-->

<template>
    <div id="wrapper">
        <treasure-hunt-layout v-if="this.$route.meta.layout == 'hunt'"/>
        <default-layout v-else/>
    </div>
    <cookie-gdpr/>
</template>

<script>

import CookieGdpr from './components/cookie-gdpr.component.vue';
import DefaultLayout from './layouts/default.layout.vue';
import TreasureHuntLayout from './layouts/treasure-hunt.layout.vue';

export default {

    // Definisce variabili globali
    provide: {
        // server nodejs
        apiUrl : 'https://www.forliviamo.it',
    },

    components: {
        
        CookieGdpr, DefaultLayout, TreasureHuntLayout
        
    },

}

</script>