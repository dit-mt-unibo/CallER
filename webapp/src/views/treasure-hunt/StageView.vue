<template>
    <div class="container-fluid thunt-container">
        <div class="row thunt-header-stage" @click="openSidebar">
            <div class="col-1">
                <div class="thunt-resp-menu-btn" >
                    <div class="resp-menu-bar"></div>
                    <div class="resp-menu-bar"></div>
                    <div class="resp-menu-bar"></div>
                </div>
            </div>
            <div class="col-11">
                <span class="thunt-header-title ml-3">Caccia al tesoro</span>
            </div>
            <div class="col-12" style="background-color: #E4252A;">
                <h4 style="padding:10px 0; margin:0; font-size:1.3rem;">Tappa {{stageNumber}}: {{stageName}}</h4>
            </div>            
        </div>
        <div style="position: relative;">
            <div class="row" style="margin-top:100px;">
                <div class="col-12">
                    <img class="thunt-stage-img" :src="stageImg"/>                
                </div>
                <div class="col-12 my-3">
                    <div style="font-size:1.2rem" v-html="stageDescription"></div>
                </div>
            </div>
            <div class="row">                                
                
                <div class="col-12" align="center">
                    <iframe
                    width="100%"
                    height="300"
                    frameborder="0" style="border:0"
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="srcGMaps"
                    allowfullscreen />

                    <button class="thunt-button" type="button" @click="verify">
                        <div v-if="showButtonLoader" class="thunt-button-loader"></div>
                        <span v-if="!showButtonLoader">Verifica</span>
                    </button>

                </div>
            </div>
            <div class="row mt-3" v-if="quizChoices.length > 0">
                <div class="col-12">
                    <div class="box-block">
                        <h5><i class="fas fa-star mr-2"></i>Quiz</h5>        
                        <div class="box-block-body">
                            <p class="quiz-question">{{quizQuestion}}</p>
                            <ul v-show="quizChoices" id="quizList" class="list-group">
                                <li class="list-group-item quiz-answer" v-for="(choice , id) in quizChoices" v-bind:key="choice" :id="'list_' + id"
                                @click="selectAnswer(id)">
                                    <div>{{ choice }}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="row my-3">
                <div class="col-12">
                    <p style="font-size: 1.3rem;">
                        Se pensi di aver risposto correttamente alla domanda, prosegui la caccia!
                    </p>            
                </div>
                <div class="col-12" align="center">
                    <button type="button" 
                    class="thunt-button thunt-button-green"
                    :class="[disableNextButton ? 'thunt-button-disabled' : '']"
                    :disabled="disableNextButton"
                    @click="checkAnswer">Avanti</button>
                </div>
                <div class="col-12" align="center">
                    <button type="button" 
                    class="thunt-button thunt-button-red"                    
                    @click="showModalSkipStage = true">Salta la tappa</button>
                </div>
            </div>        
            <!-- Loader -->
            <transition name="fade">
                <div v-if="showPageLoader" class="page-loader">
                    <div class="page-loader-container">
                        <div class="loader-pure-css-spinner"></div>
                        <p>Caricamento tappa...</p>
                    </div>            
                </div>
            </transition>
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
    <!-- Sidebar  --> 
        <div id="tHuntSidebar" class="sidebar thunt-gradient" data-aria>
            <div class="thunt-sidebar-content">
                <h5>{{cookies.email}}</h5>
                <h4>Tappe</h4>
                <ol class="thunt-sidebar-ol">
                    <li :class="'stage-' + item.status" v-for="item in cookies.stages" v-bind:key="item.id">
                        {{item.name}}
                        <i v-show="item.status == 'current'" class="fas fa-hand-point-left"></i>
                        <i v-show="item.status == 'completed'" class="fas fa-check-circle"></i>
                    </li>
                </ol>
                <div align="center" class="mt-5">
                    <button class="thunt-button thunt-button-red" type="button" @click="showModalQuitGame = true">Esci dal gioco</button>
                </div>
            </div>        
        </div>  
    <!-- Finestra modale avvisi controllo posizione -->
    <transition name="fade">
        <div v-if="showModalGPS" class="thunt-modal-box">
            <div class="thunt-modal-box-container" :class="modalStyleClass">
                <div class="header"></div>
                <p class="my-4">{{modalMessage}}</p>
                <div class="my-3" align="center">                    
                    <button type="button" class="thunt-button-blue" @click="closeModal">Chiudi</button>
                </div>
            </div>            
        </div>
    </transition>
    <!-- Finestra modale avviso campo risposta vuoto -->
    <thunt-modal-message-two-buttons 
        :showModal="showModalAnswer"
        :btnDenyClass="'thunt-button-blue'"
        @thuntConfirm="showModalAnswer = false; next();"
        @thuntDeny="showModalAnswer = false;">
        <slot>
            <p class="my-4">
                Non hai risposto al quiz. Sicuro di voler continuare senza rispondere?
            </p>
        </slot>
        <template v-slot:btnyes>Continua</template>
        <template v-slot:btnno>Chiudi</template>
    </thunt-modal-message-two-buttons>
    <!-- Finestra modale chiusura gioco -->
    <thunt-modal-message-two-buttons 
        :showModal="showModalQuitGame"
        :btnConfirmClass="'thunt-button-red'"
        :btnDenyClass="'thunt-button-green'"
        @thuntConfirm="showModalQuitGame = false; quitGame();"
        @thuntDeny="showModalQuitGame = false;">
        <slot>
            <p class="my-4">
                Sicuro di voler abbandonare il gioco?
            </p>
        </slot>
    </thunt-modal-message-two-buttons>
    <!-- Finestra modale salta la tappa -->
    <thunt-modal-message-two-buttons 
        :showModal="showModalSkipStage"
        @thuntConfirm="showModalSkipStage = false; skipStage();"
        @thuntDeny="showModalSkipStage = false">
        <slot>
            <p class="my-4">
                Sicuro di voler saltare la tappa?
            </p>
        </slot>
    </thunt-modal-message-two-buttons>
</template>

<script>

import cookieModule from '../../modules/cookie.module.js';
import * as geolib from 'geolib';
import thuntModalMessageTwoButtons from '../../components/thunt-modal-message-two-buttons.vue';
const axios = require('axios');

export default ({

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {

        return {

            stageNumber: 0,
            stageName: 'nomeTappa',
            stageImg: '',
            stageDescription: '',
            stageCoords: { lat: '' , lon: '' },
            srcGMaps: '',
            showButtonLoader: false,
            showPageLoader: false,
            quizQuestion: '',
            quizAnswer: '',
            quizChoices: [],
            disableNextButton: true,
            showModalGPS: false,
            modalMessage: '',
            modalStyleClass: '',
            showModalAnswer: false,
            showModalQuitGame: false,
            showModalSkipStage: false,
            cookies: 0,

        }
    },
    
    created: function() {                

        this.loadStage();

    },

    methods: {
        
        async loadStage() {

            this.showPageLoader = true;

            this.cookies = JSON.parse(cookieModule.getCookie("treasure_hunt"));

            // Se il cookie treasure_hunt non esiste, torna alla home            
            if ( typeof this.cookies.uuid === "undefined" ) {

                return this.$router.push('/caccia-al-tesoro');

            }

            this.quizAnswer = '';
            this.quizChoices = [];            

            /**
             * Scroll in cima alla pagina
             */
            document.body.scrollTo({top: 0, left: 0, behavior: "smooth"});
            document.documentElement.scrollTo({top: 0, left: 0, behavior: "smooth"});                        

            /** Recupera i dati relativi al giocatore */
            const player = await axios.get(this.apiUrl + "/api/player/find?uuid=" + this.cookies.uuid );

            if ( player.data.length === 0 ) {

                console.log("UUID giocatore non esistente");
                return this.$router.push('/caccia-al-tesoro/errore');

            }

            // Gioco completato se current_stage_id = 0
            if ( player.data[0].current_stage_id == 0 ) {
                
                return this.$router.push('/caccia-al-tesoro/completata');

            }

            // Recupera i dati della tappa corrente
            const stage = await axios.get(this.apiUrl + "/api/stage?id=" + player.data[0].current_stage_id);

            if ( typeof stage.data.item === 'undefined' ){

                console.log("Id tappa non trovato");
                return this.$router.push('/caccia-al-tesoro/errore');

            }            
            
            this.stageName = stage.data.item.name;
            this.stageDescription = stage.data.item.full_text;
            this.stageImg = this.apiUrl + '/images/contenuti/' + stage.data.item.imageUID;            
            this.srcGMaps = 'https://www.google.com/maps/embed/v1/place?key=' + process.env.VUE_APP_GOOGLE_MAPS_API +
            '&q=' + stage.data.item.lat + ',' + stage.data.item.long + '&zoom=18';

            this.stageCoords = { lat: stage.data.item.lat , lon: stage.data.item.long };

            if ( stage.data.item.question != '') {

                this.quizChoices = stage.data.item.choices;
                this.quizQuestion = stage.data.item.question;

            }
            else {

                this.quizQuestion = stage.data.item.task;

            }            

            this.disableNextButton = true;

            /**
             * Assegna alle tappe uno stato che può essere current, completed, none.
             * Lo status current è per la tappa corrente
             * Lo status completed è per le tappe completate. Non avendo questo dato dal server,
             * si impostano come completed tutte le tappe con position inferiore a quello della tappa corrente.
             * Queste impostazioni servono ad applicare lo stile corretto agli oggetti della barra laterale             
             */
            for (let i=0; i < this.cookies.stages.length; ++i) {

                if ( this.cookies.stages[i].position == stage.data.item.position ) {
                    
                    this.stageNumber = i+1;
                    this.cookies.stages[i].status = "current";

                }
                else if( this.cookies.stages[i].position < stage.data.item.position ) {

                    this.cookies.stages[i].status = "completed";

                }
                else {

                    this.cookies.stages[i].status = "none";

                }

            }

            cookieModule.setCookieJson("treasure_hunt" , this.cookies , 1);

            this.showPageLoader = false;

        },

        /**
         * Verifica la posizione dell'utente
         */
        verify() {
            
            this.showButtonLoader = true;

            navigator.geolocation.getCurrentPosition(this.verifyPosSuccess , this.verifyPosError , {enableHighAccuracy: true});
            
        },

        /**
         * Callback per il metodo getCurrentPosition dell'oggetto Navigator.
         * Chiamato quando la geolocalizzazione dell'utente avviene correttamente.
         * 
         * @param {object} pos: oggetto contenente le coordinate rilevate da navigator.geolocation.getCurrentPosition
         */
        verifyPosSuccess(pos) {

            const pStart = {
                lat: pos.coords.latitude,
                lon: pos.coords.longitude
            }            

            const distance = geolib.getPreciseDistance(pStart , this.stageCoords);

            if ( distance > 500 ){

                this.modalMessage = "C'è tanta strada da fare!";
                this.modalStyleClass = "thunt-modal-box-red";
                this.disableNextButton = true;

            }
            else if ( distance <= 500 && distance > 50 ) {

                this.modalMessage = "Non manca molto!";
                this.modalStyleClass = "thunt-modal-box-orange";
                this.disableNextButton = true;

            }
            else {

                this.modalMessage = "Meta raggiunta!";
                this.modalStyleClass = "thunt-modal-box-green";
                this.disableNextButton = false;

            }
            
            this.showModalGPS = true;
            this.showButtonLoader = false;

        },

        /**
         * Callback per il metodo getCurrentPosition dell'oggetto Navigator.
         * Chiamato in caso di errore durante la geolocalizzazione dell'utente
         * 
         * @param {Object} err: oggetto errore generato da navigator.geolocation.getCurrentPosition
         */
        verifyPosError(err){

            if ( err.code == 1 ){

                this.modalMessage = "Attivare la geolocalizzazione sul dispositivo";

            }
            else{

                this.modalMessage = "Impossibile verificare la posizione";
                console.log("Error message " + err.message + " Error code " + err.code);

            }

            this.modalStyleClass = 'thunt-modal-box-red';
            this.showModalGPS = true;            
            this.disableNextButton = true;
            this.showLoader = false;

        },

        /**
         * Listener evento selezione risposta dell'utente.
         * Imposta quizAnswer con la scelta dell'utente, evidenzia l'elemento della lista selezionato.
         *          
         * @param {int} elmID: id elemento selezionato         
         */
        selectAnswer(elmID) {

            this.quizAnswer = elmID;

            this.cleanPlayerSelection();
            
            let selectedElement = document.getElementById("list_" + elmID);

            selectedElement.classList.add("quiz-response-success-bg");

        },

        /**
         * Rimuove l'evidenziazione dell'elemento selezionato nella lista a scelta multipla
         */
        cleanPlayerSelection() {

            let listElements = document.getElementById("quizList").children;            

            for (let index = 0; index < listElements.length; index++) {
                
                const element = listElements[index];
                element.classList.remove("quiz-response-success-bg");
                             
            }

        },

        /**
         * Controlla che l'utente abbia inserito una risposta
         */
        checkAnswer() {

            if (this.quizAnswer.length == 0 && this.quizChoices.length > 0){

                this.showModalAnswer = true;

            }
            else {

                this.next();

            }

        },

        /**
         * Invia la risposta dell'utente e prosegue alla tappa successiva.
         * Chiamata API
         */
        async next() {
                        
            let response = null;
            let apiError = false;

            try{

                response = await axios.post(this.apiUrl + "/api/player/save-answer" , { uuid: this.cookies.uuid , answer: this.quizAnswer , hunt_id: this.cookies.hunt_id });

            }
            catch(err) {

                apiError = true;
                console.log(err.response.data.message);

            }

            if ( apiError ) {

                this.modalMessage = "Impossibile salvare la risposta, riprovare tra qualche istante";
                this.modalStyleClass = "thunt-modal-box-red";
                this.showModalGPS = true;

            }
            else {

                if ( response.data.success == 1 ) {

                    this.loadStage();

                }
                else {

                    this.modalMessage = "Impossibile salvare la risposta, riprovare tra qualche istante";
                    this.modalStyleClass = "thunt-modal-box-red";
                    this.showModalGPS = true;

                }

            }                
                    
        },

        /**
         * Salta la tappa. 
         * Il giocatore conferma di voler saltare la tappa.
         * Il sistema effettua la chiamata API per registrare la risposta non data.
         */
        async skipStage() {

            let response = null;
            let apiError = false;

            try{

                response = await axios.post(this.apiUrl + "/api/player/save-answer" , { uuid: this.cookies.uuid , answer: "" , hunt_id: this.cookies.hunt_id });

            }
            catch(err) {

                apiError = true;
                console.log(err.response.data.message);

            }

            if ( apiError ) {

                this.modalMessage = "Impossibile proseguire alla tappa successiva, riprovare tra qualche istante";
                this.modalStyleClass = "thunt-modal-box-red";
                this.showModalGPS = true;

            }
            else {

                if ( response.data.success == 1 ) {

                    this.loadStage();

                }
                else {

                    this.modalMessage = "Impossibile proseguire alla tappa successiva, riprovare tra qualche istante";
                    this.modalStyleClass = "thunt-modal-box-red";
                    this.showModalGPS = true;

                }

            }

        },

        /**
         * Apre il menu di navigazione laterale
         */
        openSidebar() {
            
            const attr = document.getElementById("tHuntSidebar").getAttribute("data-aria");

            if ( attr == "" ) {                

                document.getElementById("tHuntSidebar").style.width = "100%";
                document.getElementById("tHuntSidebar").style.paddingLeft = "10px";
                document.getElementById("tHuntSidebar").style.paddingRight = "10px";
                document.getElementById("tHuntSidebar").setAttribute("data-aria" , "open");

            }
            else {

                this.closeSidebar();

            }            
        },

        /**
         * Chiude il menu di navigazione laterale
         */
        closeSidebar() {

            document.getElementById("tHuntSidebar").style.width = "0";
            document.getElementById("tHuntSidebar").style.paddingLeft = "0px";
            document.getElementById("tHuntSidebar").style.paddingRight = "0px";
            document.getElementById("tHuntSidebar").setAttribute("data-aria" , "");

        }, 

        /**
         * Chiude finestra modale
         */
        closeModal() {

            this.showModalGPS = false;
            this.showModalAnswer = false;
            this.showModalQuitGame = false;
            this.showModalSkipStage = false;
            this.modalMessage = '';
            this.modalStyleClass = '';

        },

        /**
         * Chiude il gioco e torna alla home
         */
        quitGame() {

            cookieModule.deleteCookie("treasure_hunt");
            this.$router.push('/caccia-al-tesoro');

        }
    },

    components: {
        thuntModalMessageTwoButtons
    }
})
</script>
