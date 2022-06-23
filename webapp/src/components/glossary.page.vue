<!-- Pagina per visualizzare le info della parole del giorno -->

<template>
    <toolbar :title="'Parola del giorno'" :category_id="''" />
    <div class="container">        
        <div class="row mb-2">
            <div class="col-12 titolo">
                <div style="display: inline-block; vertical-align:middle;">{{item.term}}</div>
                <div v-if="item.audio" class="audio-player-box" @click="playAudio()">
                    <i id="speaker" class="audio-player-volume fas fa-volume-off"></i>
                    <span class="audio-player-label">ascolta</span>
                </div>                
            </div>            
        </div>
        <div class="row rounded-top place-content pt-3 mb-3">
            <div v-if="item.term" class="col-12">
                <div v-if="item.image" class="box-place-img">
                    <div class="place-container-img">
                        <img class="place-img" :src="imagePath" />
                    </div>
                    <p id="caption" class="caption card-text-truncate" @click="expand">
                        {{ item.image_caption }}
                    </p>
                </div>
                <span v-html="item.definition"></span>
            </div>
            <div v-if="!item.term" class="col-12">
                <p>Nessun vocabolo disponibile</p>
            </div>
        </div>
        <div class="row box-related mt-3" v-if="relatedItems">
            <ul class="list-group">
                <li class="list-group-item">
                    <h5>Continua a leggere</h5>
                </li>
                <li class="list-group-item" v-for="rItem in relatedItems"
                    v-bind:key="rItem" @click="goTo(rItem.id)">
                    <div class="box-related-img">
                        <img id="img-top" class="card-img-mini"
                            :src="this.apiUrl + '/images/contenuti/thumbs/' + rItem.imageUID"/>
                    </div>
                    <div class="box-related-entry card-text-truncate">
                        <div class="box-related-entry-level">
                            <span v-if="rItem.level == 0" class="livello-facile">Livello: facile</span>
                            <span v-if="rItem.level == 1" class="livello-intermedio">Livello: intermedio</span>
                            <span v-if="rItem.level == 2" class="livello-difficile">Livello: difficile</span>
                        </div>
                        <div>{{ rItem.name }}</div>
                        <p class="d-none d-sm-block card-text card-text-truncate box-related-intro-text" v-html="rItem.intro_text"></p>
                    </div>
                    <div style="clear: both"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import toolbar from './toolbar.component.vue';

const axios = require('axios');

export default {
    
    name: 'glossary',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {

            //oggetto parola del giorno. Dati recuperati tramiti chiamata API
            item: {},
            // oggetto audio
            audioElement: null,
            // oggetto contenuti relativi. I contenuti in cui il vocabolo è presente.
            relatedItems: [],

        }
    },

    watch: {

        "item" () {

            if (typeof this.item.audioUID === "undefined" || this.item.audioUID == null) {

                this.audioElement.src = "";

            }
            else{

                this.audioElement.src = this.apiUrl + "/glossario/" + this.item.audioUID;

            }            

        } 

    },

    computed: {

        imagePath() {
            
            if (typeof this.item.imageUID === "undefined" || this.item.imageUID == null) return "";

            return this.apiUrl + "/glossario/" + this.item.imageUID;
        },

    },

    beforeMount: async function(){

        // Inizializza oggetto audio
        this.audioElement = new Audio();

        // Listener evento play su oggetto audio
        this.audioElement.addEventListener('play' , () => {
            
            document.getElementById("speaker").classList.replace("fa-volume-off" , "fa-volume-up");

         });

         // Listener evento pause su oggetto audio
        this.audioElement.addEventListener('pause' , () => {
            
            document.getElementById("speaker").classList.replace("fa-volume-up" , "fa-volume-off");

         });

        await this.getTodaysWord();

        await this.getRelatedItems();
        
    },

    created: async function(){

        document.body.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        document.documentElement.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        
    },

    methods: {

        /**
         * Chiamata API, recupera la parola del giorno
         */
        async getTodaysWord() {

            const response = await axios.get(this.apiUrl + '/api/get-todays-word');
            this.item = response.data.item;

        },

        async getRelatedItems() {

            const response = await axios.get(this.apiUrl + '/api/get-glossary-related-content?term=' + this.item.name);
            this.relatedItems = response.data;

        },

        goTo(id) {
                        
            this.$router.push('/contenuto/' + id);

        },

        /**
         * Listener evento click bottone play audio.
         * Avvia riproduzione audio. 
         */
        playAudio() {

            this.audioElement.play();

        }

    },

    components: {
        toolbar
    }

}
</script>