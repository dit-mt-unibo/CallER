<template>
    <div class="container-fluid thunt-container">
        <div class="row thunt-header">
            <div class="col-12">
                <span class="thunt-header-title">Gioco delle coppie</span>
            </div>
        </div>
        <div class="row" style="position:relative;">
                <img class="thunt-img-home" src="../../assets/images/abgame-home.jpg"/>
                <div class="thunt-box-intro">
                    <p class="thunt-gradient" style="font-size:2.2rem; padding:20px 0;">{{title}}</p>
                </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <div style="font-size: 1.3rem;" v-html="description"></div>
            </div>
            <div align="center" class="col-12 mt-3">
                <button class="thunt-button" @click="this.$router.push('/gioco-ab/domande')">Inizia</button>
            </div>
        </div>        
    </div>
    <div class="container-fluid">
        <div class="row">
            <div align="center" class="col-12 thunt-footer">
                <p>@2025 DIT - Forlì</p>
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
import cookieModule from '../../modules/cookie.module.js';

export default ({
    
    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {
            // titolo del gioco
            title: '',
            // descrizione del gioco
            description: '',
        }

    },

    created: async function() {

        var cookies = JSON.parse(cookieModule.getCookie("abgame"));

        if ( typeof cookies.uuid === 'undefined' ) {

            this.$router.push('/gioco-ab/errore');

        }
        else {
            
            /**
             * Recupera i dati relativi alla caccia al tesoro con una chiamata API 
             */
            const response = await axios.get(this.apiUrl + "/api/abgame" + "?id=" + cookies.abgame_id );

            if ( response.data.children.length > 0 ) {

                this.title = response.data.item.name;
                this.description = response.data.item.description;

                cookies.questions = response.data.children;

                cookieModule.setCookieJson("abgame" , cookies , 1);

            }
            else {

                console.log("ID caccia inesistente");
                this.$router.push('/gioco-ab/errore');

            }            

        }

    }

})
</script>
