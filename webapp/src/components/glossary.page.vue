<!-- Pagina per visualizzare le info della parole del giorno -->

<template>    
    <div class="container">
        <toolbar :title="'Glossario'" :category_id="''" />
        <div class="row mb-2">
            <div class="col-12 titolo">
                <div style="display: inline-block; vertical-align:middle;">{{item.term}}</div>
                <div v-if="item.audio" class="audio-player-box" @click="playAudio()">
                    <i id="speaker" class="audio-player-volume fas fa-volume-off"></i>
                    <span class="audio-player-label">ascolta</span>
                </div>                
            </div>            
        </div>
        <div class="row rounded-top place-content pt-3">
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
        <div class="row mt-4 mb-4">
            <div align="center" class="col-12">
                <button class="btn btn-info mr-2" @click="getRandomWord">Nuova parola</button>
                <button class="btn btn-success" @click="getTodaysWord">Parola del giorno</button>
            </div>
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

        /**
         * Chiamata API, recupera una parola a caso dal glossario
         */
        async getRandomWord() {

            const response = await axios.get(this.apiUrl + '/api/get-random-word');
            this.item = response.data.item;

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