<!-- Pagina ricerca. Elenco elementi trovati -->

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 titolo">Ricerca tag #{{this.term}}</div>
        </div>         
    </div>
    <div class="container">
        <div class="row">
            <listitems v-for="item in filterItems" v-bind:key="item.id" v-bind:item="item" v-bind:href="/contenuto/" v-bind:intro_text="item.intro_text"/>
        </div>
    </div>    
</template>

<script>

import listitems from './listitems.component.vue';
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

        }

    },

    computed: {

        /**
         * Filtra l'array contenuti this.items tramite la stringa di ricerca this.term
         */
        filterItems() {
            
            if ( this.items.length == 0 ) return [];

            return this.items.filter(item => {

                if ( typeof this.term === 'undefined' ) return item;

                if ( this.term == '' ) return item;

                if ( item.tags.length == 0 ) return item;

                var found = false;

                item.tags.forEach(tag => {
                    
                    if ( tag.toLowerCase() === this.term ) {

                        found = true;
                        return;

                    }

                });

                
                if ( found ) return item;

                return null;

            });

        }

    },
    
    beforeMount: async function() {
    
        this.items = await this.getPlaces();
        this.term = this.$route.params.term.toLowerCase();
    
    },
    
    methods : {
        
        /**
         * Recupera dal database i contenuti (luoghi)
         */
        async getPlaces() {
            
            const response = await axios.get(this.apiUrl + "/place");
            
            return response.data;      
            
        },

        /**
         * Listener evento click su elemento della lista.
         * 
         * @param {int} item_id: ID elemento cliccato
         */
        goTo(item_id) {

            let url = '/contenuto/' + item_id
            this.$router.push(url);

        }
        
    },

    components: {

        listitems

    }
    
}

</script>
