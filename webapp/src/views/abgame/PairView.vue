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
                <span class="thunt-header-title ml-3">Gioco delle coppie</span>
            </div>
            <div class="col-12" style="background-color: #E4252A;">
                <h4 style="padding:10px 0; margin:0; font-size:1.3rem;">Domanda {{abquestionNumber}}: </h4>
            </div>            
        </div>
        <div style="position: relative;">
          <div class="row" style="margin-top:100px;">
            <div class="col-12 my-3">
              <div style="font-size:1.2rem" v-html="questionExplained"></div>
            </div>

            <div class="col-12">
              <img class="thunt-stage-img" :src="questionImg1" />
            </div>
            <div class="col-12">
              <img class="thunt-stage-img" :src="questionImg2" />
            </div>
          </div>

          <div id="setup" class="container">
            <p>Le foto rappresentano <b><i>{{to_guess}}</i></b> e <b><i>{{other}}</i></b></p>
            <p>Quale di queste due immagini rappresenta <b>{{to_guess}}</b>? Cliccaci sopra..</p>
            <div class="row">
              <div class="col-sm-4">
                <p><a href="#" data="0" onclick="setupVar(0);return false;"><img src="{{image1}}" style="max-width:600px;width:90%" /></a></p>
              </div>
              <div class="col-sm-4">
                <p><a href="#" data="1" onclick="setupVar(1);return false;"><img src="{{image2}}" style="max-width:600px;width:90%" /></a></p>
              </div>
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
            </div>        
        </div>  
    
    
</template>

<script>

import cookieModule from '../../modules/cookie.module.js';
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
            quizQuestion: '',
            answer: '',
            quizChoices: [],            
            cookies: 0,
            points: 0,

        }
    },
    
    created: function() {                

        this.loadStage();

    },

    methods: {
        
        async loadStage() {

            this.showPageLoader = true;

            this.cookies = JSON.parse(cookieModule.getCookie("abgame"));

            // Se il cookie abgame non esiste, torna alla home            
            if ( typeof this.cookies.uuid === "undefined" ) {

                return this.$router.push('/gioco-ab');

            }

            this.answer = Math.floor(Math.random() * 100) % 2;           

            /**
             * Scroll in cima alla pagina
             */
            document.body.scrollTo({top: 0, left: 0, behavior: "smooth"});
            document.documentElement.scrollTo({top: 0, left: 0, behavior: "smooth"});                        

        /** Recupera i dati relativi al giocatore */
            /* NON SI APPLICA QUI, DA RIFARE
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
            
            if ( stage.data.item.question != '') {

                this.quizChoices = stage.data.item.choices;
                this.quizQuestion = stage.data.item.question;

            }
            else {

                this.quizQuestion = stage.data.item.task;

            }            

            this.disableNextButton = true;
            
            
            */
            cookieModule.setCookieJson("treasure_hunt" , this.cookies , 1);

            this.showPageLoader = false;

        },
        
        

        /**
         * Listener evento selezione risposta dell'utente.
         * Imposta answer con la scelta dell'utente, evidenzia l'elemento della lista selezionato.
         *          
         * @param {int} elmID: id elemento selezionato         
         */
        selectAnswer(elmID) {

            this.answer = elmID;

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

        // controlla la risposta e aggiorna il punteggio
        setupVar(i) {
          let correct_answer = this.answer;
          let guessed_so_far = this.points;
          let guessed_correctly = 'T';
          if (i == correct_answer) {
            alert("Esatto!");
            guessed_so_far++;
          }
          else {
            guessed_correctly = 'F';
            alert("Mi spiace, risposta sbagliata!");
          }
          document.getElementById("informazioni").hidden = false;
          document.getElementById("setup").hidden = true;
          let originalref = document.getElementById("continua").getAttribute("href");
          let finalref = originalref + "&guessed=" + guessed_so_far;
          document.getElementById("continua").setAttribute("href", finalref);
          let pair_name = "IT-{{name1}}-{{name2}}-" + guessed_correctly;
          console.log(pair_name);
          //umami.track('game-answer', { name: pair_name });
        },

        /**
         * Controlla che l'utente abbia inserito una risposta
         */
        checkAnswer() {

            if (this.answer.length == 0 && this.quizChoices.length > 0){

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

                response = await axios.post(this.apiUrl + "/api/player/save-answer" , { uuid: this.cookies.uuid , answer: this.answer , hunt_id: this.cookies.hunt_id });

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
        
    },

})
</script>
