<!-- Pagina per visualizzare le info della parole del giorno -->

<template>    
    <div class="container">
        <toolbar :title="'Glossario'" :category_id="''" />
        <div class="row mb-2">
            <div class="col-12 titolo">{{item.term}}</div>
        </div>
        <div class="row rounded-top place-content pt-3">
            <div class="col-12">
                <p v-html="item.definition"></p>
            </div>
        </div>
        <div class="row mt-4 mb-4">
            <div align="center" class="col-12">
                <button class="btn btn-info mr-2" @click="getRandomWord">Nuova parola</button>
                <button class="btn btn-success" @click="getTodaysWord">Parola del giorno</button>
            </div>
        </div>
    </div>
</template>

<script>

import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {
    
    name: 'glossary',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {

            //oggetto parola del giorno. Dati recuperati tramiti chiamata API
            item: {}

        }
    },

    beforeMount: async function(){

        await this.getTodaysWord();
        
    },

    created: async function(){

        document.body.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        document.documentElement.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        
    },

    methods: {

        /**
         * Chiamata API, recupera la parola del giorno
         */
        async getTodaysWord() {

            const response = await axios.get(this.apiUrl + '/api/get-todays-word');
            this.item = response.data.item;

        },

        async getRandomWord() {

            const response = await axios.get(this.apiUrl + '/api/get-random-word');
            this.item = response.data.item
        }

    },

    components: {
        toolbar
    }

}
</script>