<!-- Home page della WebApp -->

<template>
    <toolbar :title="''" :category_id="''" />
    <modalTodaysWord/>
    <div class="container pt-4">
        <div align="center" class="row">            
            <div class="col-6 col-md-4" v-for="abgame in abgames" v-bind:key="abgame.id" v-bind:abgame="abgame">
                <div class="home-icon-box" align="center">
                    <span class="btn" @click="goTo(abgame.id)">                        
                      <p class="mt-3">{{abgame.name}}</p>
                    </span>
                </div>             
            </div>            
        </div> <!-- chiusura row -->
    </div> <!-- chiusura container -->    
</template>

<script>

import toolbar from './toolbar.component.vue';

const axios = require('axios')

export default {
    
    name: 'home',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            // Oggetto giochi recuperate dal database
            abgames: [],
        }        

    },
    
    created : async function() {
    
        await this.getGames();
    
    },
    
    methods : {
        
        /**
         * Recupera le abgame  dal database e popola l'oggetto this.abgames.
         */
        async getGames() {
            
            const response = await axios.get(this.apiUrl + "/api/abgame");
            
            response.data.forEach(element => {
                
                this.abgames.push(element);

            });      
            
        },

        /**
         * Listener evento click. Apre la pagina del gioco indicato
         * 
         * @param {int} abgame_id ID game
         */
        goTo(abgame_id) {

          let url = '/abgame/' + abgame_id
            this.$router.push(url);

        }
        
    },

    components: {
        toolbar 
    }
    
}

</script>    
