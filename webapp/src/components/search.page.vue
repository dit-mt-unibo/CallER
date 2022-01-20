<!-- Pagina ricerca. Elenco elementi trovati -->

<template>
    <toolbar :title="''" :category_id="''" />
    <div class="container">
        <div class="row">
            <div class="col-12 titolo">Risultati ricerca</div>
        </div>         
    </div>
    <div class="container">
        <div class="row justify-content-start">
            <listitems v-for="item in items" v-bind:key="item.id" v-bind:item="item" v-bind:href="/contenuto/" v-bind:intro_text="item.intro_text"/>
        </div>
    </div>    
</template>

<script>

import listitems from './listitems.component.vue';
import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {
    
    name: 'search',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            
            // array contenuti
            items: [],
            // filtro ricerca
            term : '',
            // tag | word
            type: '',

        }

    },

    watch: {
        
        /**
         * Osserva il cambiamento del parametro term nella url.
         * Chiama il metodo getPlaces per aggiornare i contenuti della pagina.
         */
        "$route.params.term"() {

            this.term = this.$route.params.term;
            this.getPlaces();

        },

        /**
         * Osserva il cambiamento del parametro type nella url.
         * Chiama il metodo getPlaces per aggiornare i contenuti della pagina.
         */
        "$route.params.type"() {

            this.type = this.$route.params.type;
            this.getPlaces();

        },

    },
    
    beforeMount: async function() {
            
        this.term = this.$route.params.term;
        this.type = this.$route.params.type.toLowerCase();

        await this.getPlaces();
    
    },

    created: function() {

        document.body.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        document.documentElement.scrollTo({ top:0 , left:0 , behavior: 'smooth' });

    },
    
    methods : {
        
        /**
         * Recupera dal database i contenuti (luoghi)
         */
        async getPlaces() {
            
            let apiUrl = ( this.type == 'word' ) ? "/api/search?term=" : "/api/search-tag?tag=";            

            try {

                var response = await axios.get(this.apiUrl + apiUrl + this.term);
                this.items = response.data.items;

            }
            catch (err) {

                console.log(err);
                this.items = [];

            }                              
            
        },
        
    },

    components: {

        listitems, 
        toolbar

    }
    
}

</script>
