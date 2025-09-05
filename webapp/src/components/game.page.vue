<!-- Lista sottocatgorie -->

<template>
    <toolbar :title="name" :abgame_id="$route.params.id" />
    <div class="container-fluid mt-3 mb-3">
      <div class="row">
        <div class="col-12" v-html="name"></div>
      </div>
      <div class="row">
        <div class="col-12" v-html="description"></div>
      </div>
    </div>
    <div class="container">
        <div class="row justify-content-start">          
          <!-- al submit/click, chiama Player.create() che deve creare e ritornare un uuid -->
         </div>
    </div>
</template>

<script>

import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {

    name: 'gioco A/B' ,

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data () {

        return {

            // nome gioco
            name: "",
            // descrizione gioco
            description: "",
            // domande del gioco
            children: [],
            // base url per link alla pagina domande
            href: "/domande/",

        }

    } ,

    watch: {

       async "$route.params.id" () {

            if ( this.$route.name == "abgame" ) {

              let data = await this.getGamedata();
              console.log(data);

            }

        },
      
    },

    created : async function () {

      await this.getGamedata();

    },


    methods: {

      async getGamedata() {
        /**
        * Recupera i dati relativi al gioco con una chiamata API 
        */
        let id = this.$route.params.id;
        const response = await axios.get(this.apiUrl + "/api/abgame/" + id);
        
        console.log(response.data);

        this.name = response.data.item.name; // perche' non si chiama 'item' il primo elemento del json data come per l'oggetto place?
        this.description = response.data.item.description;

        this.children = response.data.children;
        console.log(this.children);
        //cookieModule.setCookieJson("abgame", cookies, 1);
        return response.data;
   

      }

    },


    components: {

        toolbar

    }


}

</script>
