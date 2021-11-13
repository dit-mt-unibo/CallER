<!-- Finestra popup con informativa sui cookie -->

<template>
    <div v-if="isVisible" id="cookie-gdpr">
        <p align="center" class="d-none d-lg-block d-xl-block">
            Questo sito utilizza cookie tecnici per il corretto funzionamento. Continuando a navigare acconsenti all'utilizzo dei cookie.
        </p>
        <p class="d-block d-lg-none d-xl-none">
            Questo sito utilizza cookie tecnici per il corretto funzionamento.
        </p>
        <p class="d-block d-lg-none d-xl-none">
            Continuando a navigare acconsenti all'utilizzo dei cookie.
        </p>
        <div align="center">
            <a href="http://www.unibo.it/it/cookies" target="_blank" class="mr-4">Informazioni</a>
            <a class="" @click="close">Ho capito</a>
        </div>        
    </div>
</template>

<script>

import Cookie from '../modules/cookie.module.js';

export default ({
   
   name: 'cookie-gdpr',

   data() {
       
       return {
           // mostra la finestra
           show: true
       }

   },

   computed: {

       /**
        * Mostra/nasconde la finestra
        */
       isVisible() {

           return this.show;
           
       }

   },

   created: function() {

       let cookie_gdpr = Cookie.getCookie("cookie_gdpr");
       this.show = ( cookie_gdpr == '0' );

   },

   methods: {

       /**
        * Listener evento click link "Ho capito".
        * Chiude la finestra e imposta cookie_gdpr a 1
        */
       close() {

           Cookie.setCookie("cookie_gdpr" , 1 , 365);
           this.show = false;

       },

   }
})
</script>
