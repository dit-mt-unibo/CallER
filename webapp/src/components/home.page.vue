<!-- Home page della WebApp -->

<template>
    <toolbar :title="''" :category_id="''" />
    <modalTodaysWord/>
    <div class="container pt-4">
        <div align="center" class="row">            
            <div class="col-6 col-md-4" v-for="category in categories" v-bind:key="category.id" v-bind:category="category">
                <div class="home-icon-box" align="center">
                    <span class="btn" @click="goTo(category.id)">
                        <i class="fas fa-3x" :class="'fa-' + category.icon"></i>
                        <p class="mt-3">{{category.name}}</p>
                    </span>
                </div>             
            </div>            
        </div> <!-- chiusura row -->
    </div> <!-- chiusura container -->    
</template>

<script>

import toolbar from './toolbar.component.vue';
import modalTodaysWord from './modal-todays-word.component.vue';

const axios = require('axios')

export default {
    
    name: 'home',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            // Oggetto categorie principali recuperate dal database
            categories: [],
        }        

    },
    
    created : async function() {
    
        await this.getCategories();
    
    },
    
    methods : {
        
        /**
         * Recupera le categorie principali dal database e popola l'oggetto this.categories.
         * La categoria Home ID = 1 è esclusa dall'elenco
         */
        async getCategories() {
            
            const response = await axios.get(this.apiUrl + "/api/category");
            
            response.data.forEach(element => {
                
                if ( element.id != 1 && element.parent_id == null ) {
                    
                    this.categories.push(element);

                }

            });      
            
        },

        /**
         * Listener evento click. Apre la pagina con l'elenco delle sottocategorie
         * 
         * @param {int} category_id ID categoria
         */
        goTo(category_id) {

            let url = '/categorie/' + category_id
            this.$router.push(url);

        }
        
    },

    components: {
        toolbar , modalTodaysWord
    }
    
}

</script>    