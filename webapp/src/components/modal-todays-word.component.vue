<!-- Finestra modale con la parola del giorno -->

<template>
    <transition name="fade">
        <div v-if="show" class="box-word-home">
            <h5><i class="fas fa-language mr-2"></i>Parola del giorno</h5>
            <p align="center" class="term">{{item.term}}</p>
            <div class="mt-3">
                <button type="button" class="btn-definition" @click="goTo">Apri definizione</button>                
            </div>
        </div>
    </transition>    
</template>

<script>

import Cookie from '../modules/cookie.module.js';

const axios = require("axios");

export default ({
    
    name: 'modalTodaysWord',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            // mostra/nasconde la finestra
            show: false,
            // oggetto recuperato da chiamata API. Contiene chiavi 'term' e 'id'
            item: [],
        }
    },

    created: async function() {

        let cookie_word = Cookie.getCookie("cookie_tds_word");        

        if (cookie_word == '0'){

            this.item = await this.getTodaysWord();

            if ( typeof this.item.term != 'undefined' ) {

                this.show = true;

                // Mostra la finestra per 5 secondi
                setTimeout(()=> {
                
                    this.show = false;
                    Cookie.setDailyCookie("cookie_tds_word" , 1);

                }, 5000);

            }

        }

    },

    methods: {

        /**
         * Chiamata API, recupera la parola del giorno
         */
        async getTodaysWord() {

            const response = await axios.get(this.apiUrl + '/api/get-todays-word');
            return response.data.item;

        },

        /**
         * Reindirizza alla pagina parola del giorno per visualizzare maggiori info.
         * Imposta il cookie di controllo a 1 e scadenza alle 23:59:59 del giorno corrente
         */
        goTo() {
            
            let url = '/parola-del-giorno';
            this.$router.push(url);
            Cookie.setDailyCookie("cookie_tds_word" , 1);

        },

    }
})

</script>
