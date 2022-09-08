<template>
    <!--<div class="container-fluid main-container pb-3 padding-none">-->
    <div class="container-fluid thunt-container">

        <div class="row thunt-header">
            <div class="col-12">
                <span class="thunt-header-title">Caccia al tesoro</span>
            </div>
        </div>

        <div class="row" style="position:relative;">
            <img class="thunt-img-home" src="../../assets/images/treasure-hunt-home.jpg"/>
            <div class="thunt-box-intro thunt-gradient">
                <p class="thunt-box-intro-first-line">Caccia al tesoro</p>
                <p class="thunt-box-intro-second-line">Gioca, scopri, impara</p>
            </div>
        </div>

        <div class="container padding-none" style="margin-top:10px;">
            <div class="row">
                <p style="font-size: 1.4rem;">
                    Gioca con i tuoi colleghi e amici universitari mentre impari a navigare per la città!
                </p>
                <p style="font-size: 1.4rem;">
                    Sfidali, in un'emozionante caccia al tesoro alla scoperta dei monumenti più belli e suggestivi di Forlì!
                </p>
            </div>        
        </div>

        <div class="container mt-2 mb-4 thunt-padding-none">
            <div class="row thunt-gradient">            
                <div class="thunt-box-login">
                    <p style="font-size: 1.3rem;">
                    Pronto a metterti in gioco?
                    </p>
                    <p v-if="showField" style="font-size: 1.3rem;">
                        Inserisci l'indirizzo email e premi il pulsante "Cominciamo"!
                    </p>
                    <input v-if="showField" type="text" v-model="email"
                    :placeholder="[ showFieldError ? 'inserire indirizzo email valido' : 'indirizzo email']"
                    :class="[ showFieldError ? 'thunt-input-error' : '']">                    
                    <div align="center" class="mt-2">
                        <button class="thunt-button" @click="[showField ? login() : next()]">Cominciamo</button>
                    </div>
                </div>
            </div>
        </div>       
        
    </div>
    <div class="container-fluid">
        <div class="row">
            <div align="center" class="col-12 thunt-footer">
                <p>@2022 DIT - Forlì</p>
                <p>
                    <span @click="this.$router.push('/contenuto/81');">Credits</span>
                    <a href="https://www.unibo.it/it/ateneo/privacy-e-note-legali/privacy/privacy-sistema-portale-ateneo" target="_blank" class="ml-3">Cookie</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

const axios = require('axios');
import Cookie from '../../modules/cookie.module.js';

export default ({
    
    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            email: '',
            showField: true,
            showFieldError: false,
            huntId: '',
        }

    },

    created: async function() {

        /**
         * Mostra il campo nickname se l'utente non ha memorizzato il cookie treasure_hunt
         * o per qualche motivo non ha un UID pur avendo il cookie
         */
        var cookies = JSON.parse(Cookie.getCookie("treasure_hunt"));

        this.showField = (typeof cookies.uuid === 'undefined');
        
        if ( typeof cookies.hunt_id === 'undefined' ) {

            this.huntId = await this.getHuntId();

        }

    },

    methods: {

        /**
         * Chiamati API recupero ID caccia al tesoro
         */
        async getHuntId() {

            const response = await axios.get(this.apiUrl + "/api/get-hunt-id?limit=1&sort=id%20DESC" );
            return response.data[0].id;

        },

        /**
         * Controlla che il campo nickname sia compilato.
         * Invia il nickname al server API.
         * La risposta del server viene salvata nei cookie
         */
        async login() {

            this.showFieldError = false;

            if ( this.email.length > 0 ) {                

                const response = await axios.post(this.apiUrl + "/api/player/create" , { email: this.email , hunt_id: this.huntId });
                
                if ( response.data.success == 1 ) {

                    const cookie = {
                        email: this.email,
                        uuid: response.data.uuid,
                        hunt_id: this.huntId,
                        stages: {},
                    };

                    Cookie.setCookieJson("treasure_hunt" , cookie , 1);

                    this.$router.push('/caccia-al-tesoro/intro');

                }
                else {

                    this.email = "";
                    this.showFieldError = true;

                }                             

            }
            else {
                
                this.showFieldError = true;

            }

        },

        /**
         * Muove l'utente alla pagina intro della caccia al tesoro
         */
        next() {

            this.$router.push('/caccia-al-tesoro/intro');

        }
    }

})
</script>
