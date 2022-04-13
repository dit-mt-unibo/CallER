<!-- Lista contenuti di una categoria -->

<template>
<div>
    <toolbar :title="name" :category_id="id"/>
    <div class="container-fluid mt-3 mb-3">
        <div class="row">
            <div class="col-12" v-html="description" ></div>
        </div>
    </div>
    <div class="container">
        <div class="row justify-content-start">
            <listitems v-for="child in children" v-bind:key="child.id" v-bind:item="child" v-bind:href="/contenuto/" v-bind:intro_text="child.intro_text"/>
        </div>
    </div>
</div>
</template>

<script>

import listitems from './listitems.component.vue';
import toolbar from './toolbar.component.vue';
const axios = require('axios');

export default {
    
    name: 'places' ,

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],
    
    data () {
        
        return {

            id: "",
            // nome della categoria
            name: "",
            // descrizione della categoria
            description: "",
            // luoghi contenuti nella categoria
            children: [],

        }
        
    } ,
    
    created : async function () {
        
        await this.getPlaces();
        
    } ,
    
    methods : {
        
        /**
         * Recupera dal database i dati relativi ad una categoria e ai luoghi
         */
        async getPlaces() {
            
            this.id = this.$route.params.cat_id;
            const response = await axios.get(this.apiUrl + "/category/" + this.id);            

            this.name = response.data.item.name;
            this.description = response.data.item.description;
            this.children = response.data.childrenPlaces;

        },
        
    },

    components: {

        listitems,
        toolbar

    }
    
}

</script>