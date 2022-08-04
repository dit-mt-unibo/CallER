<!-- Lista sottocatgorie -->

<template>
    <toolbar :title="name" :hunt_id="$route.params.id" />
    <div class="container-fluid mt-3 mb-3">
        <div class="row">
            <div class="col-12" v-html="description" ></div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-start">
          Inserisci la tua email e comincia a giocare:

          Disclaimer: i tuoi dati verranno cancellati entro 30 giorni.
          <!-- al submit/click, chiama Player.create() che deve creare e ritornare un uuid -->
         </div>
    </div>
</template>

<script>

import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {

    name: 'caccia al tesoro' ,

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data () {

        return {

            // nome categoria
            name: "",
            // descrizione categoria
            description: "",
            // oggetto sottocategorie
            children: [],
            // base url per link alla pagina contenuti
            href: "/contenuti/",

        }

    } ,

    watch: {

        /**
         * Osserva il cambiamento del parametro id nella url per fare il refresh dei contenuti

        async "$route.params.id" () {

            if ( this.$route.name == "categories" ) {

                this.children = await this.getCategory();

            }

        },
      */
    },

    created : async function () {

        // this.children = await this.getCategory();

    } ,

    methods : {

        async getCategory() {



            }

    },


    components: {

        toolbar

    }


}

</script>
