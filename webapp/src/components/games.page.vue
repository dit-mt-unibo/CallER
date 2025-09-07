<!-- Lista dei giochi -->

<template>
    <div class="flex content-align-center">
      <div class="titolo">Gioca con noi!</div>
          <div class="row" v-for="abgame in abgames" v-bind:key="abgame.id" v-bind:abgame="abgame">
              <div class="titolo" align="center">
                  <span class="btn" @click="goTo(abgame.id)">                        
                    <p class="titolo titolo-gioco">&gt;&nbsp;{{abgame.name}}</p>
                  </span>
              </div>
          </div>                    
    </div> <!-- chiusura container -->    
</template>

<script>

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
    }
    
}

</script>    
