<!-- Lista sottocatgorie -->

<template>
    <toolbar :title="name" :category_id="$route.params.id" />
    <div class="container-fluid mt-3 mb-3">
        <div class="row">
            <div class="col-12" v-html="description" ></div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-start">
            <listitems v-for="child in children" v-bind:key="child.id" v-bind:item="child" v-bind:href="this.href" v-bind:intro_text="child.description" />
        </div>
    </div>
</template>

<script>

import listitems from './listitems.component.vue';
import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {
    
    name: 'categories' ,

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
         */
        async "$route.params.id" () {

            if ( this.$route.name == "categories" ) {

                this.children = await this.getCategory();

            }

        },

    },
    
    created : async function () {
        
        this.children = await this.getCategory();
        
    } ,
    
    methods : {
        
        /**
         * Recupera dal database i dati delle sottocategorie.
         * Non tutte le categorie hanno sottocategorie, in tal caso restituisce i dati dei luoghi associati
         */
        async getCategory() {
            
            let id = this.$route.params.id;
            const response = await axios.get(this.apiUrl + "/api/category/" + id);

            this.name = response.data.item.name;
            this.description = response.data.item.description;

            console.log(response.data);
            if ( response.data.childrenCategories.length > 0 ) {

                this.href = "/contenuti/";
                return response.data.childrenCategories;

            }
            else {

                this.href = "/contenuto/";
                return response.data.childrenPlaces;

            }            
            
        },
        
    },

    components: {

        listitems,
        toolbar

    }

    
}

</script>    
