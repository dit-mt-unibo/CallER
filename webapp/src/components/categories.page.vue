<!-- Lista sottocatgorie -->

<template>
    <div class="container">
        <div class="row">
            <div class="col-12 titolo">{{name}}</div>
        </div> 
        <div class="row">
            <div class="col-12" v-html="description" ></div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <listitems v-for="child in children" v-bind:key="child.id" v-bind:item="child" v-bind:href="this.href" v-bind:intro_text="child.description" />
        </div>
    </div>
</template>

<script>

import listitems from './listitems.component.vue';
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
            const response = await axios.get(this.apiUrl + "/category/" + id);

            this.name = response.data.item.name;
            this.description = response.data.item.description;

            if ( response.data.childrenCategories.length > 0 ) {

                return response.data.childrenCategories;

            }
            else {

                this.href = "/contenuto/";
                return response.data.childrenPlaces;

            }
            
        },
        
    },

    components: {

        listitems

    }

    
}

</script>    