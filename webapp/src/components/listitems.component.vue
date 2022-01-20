<!-- Mostra un elenco di elementi con immagine, nome, testo introduttivo ed eventuale livello -->

<template>
<div class="col-sm-12 col-lg-4 col-md-8 mb-3">
    <div class="card" @click="goTo" data-link>
        <img id="img-top" class="card-img-top" :src="imageUrl"/>
        <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <p class="card-text card-text-truncate" v-html="intro_text"></p>
            <div class="livello" v-if="showLevel">
                <span v-if="item.level == 0" class="livello-facile">Livello: facile</span>
                <span v-if="item.level == 1" class="livello-intermedio">Livello: intermedio</span>
                <span v-if="item.level == 2" class="livello-difficile">Livello: difficile</span>
            </div>            
        </div>
    </div> 
</div>    
</template>

<script>

export default {
    
    name: 'listitems',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {
        
        return{            
            
            // url alla pagina connessa all'elemento 
            url: "",

        }

    },

    props: ['item' , 'href' , 'intro_text'],

    computed: {

        /**
         * Imposta attributo src dell'immagine
         */
        imageUrl() {

            if ( this.item.imageUID != "" ) {

                return this.apiUrl + "/images/contenuti/" + this.item.imageUID;

            }

            return "";

        },

        /**
         * Mostra o nasconde informazioni sul livello difficoltà del contenuto
         */
        showLevel() {
            
            return ( typeof this.item.level != 'undefined' );

        }

    },
    
    created: function() {

        this.url = this.href + this.item.id;

    },

    methods: {
        
        /**
         * Listener all'evento click sull'elemento della lista.
         */
        goTo() {    

            this.$router.push(this.url);

        }

    },
    
}

</script>