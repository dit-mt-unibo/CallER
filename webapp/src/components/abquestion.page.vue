<!-- Visualizza i contenuti di un luogo -->

<template>
  <div class="container">    
    <div class="titolo justify-content-center">Coppia #{{item.id}}</div>    
  </div>
   
  <div id="setup" class="container">
    <p>Le foto rappresentano <b><i>{{toGuess}}</i></b> e <b><i>{{other}}</i></b></p>
    <p>Quale di queste due immagini rappresenta <b>{{toGuess}}</b>? Cliccaci sopra..</p>
    <div class="row">
      <div class="col">
        <p><a href="#" data="0" @click="setupVar(0)"><img class="place-img" :src="item.imageUrl1" /></a></p>
      </div>
      <div class="col">
        <p><a href="#" data="1" @click="setupVar(1)"><img class="place-img" :src="item.imageUrl2" /></a></p>
      </div>
    </div>
  </div>
  <div id="informazioni" hidden>
    <p>
      Dovevamo trovare la foto per&nbsp;<b>{{toGuess}}</b>
      <br />
      Ecco spiegato cosa sono:
    </p>
    <div class="flex">
      <div class="row">
        <div class="col">
          <p><b>Nome:&nbsp;</b>{{item.name1}}</p>
          <p><img class="img-responsive piatto" style="background-color:{{bg1}}" :src="item.imageUrl1" /></p>
          <p><b>Definizione:</b> {{ item.description1 }}</p>
        </div>
        <div class="col">
          <p><b>Nome:&nbsp;</b>{{item.name2}}</p>
          <p><img class="img-responsive piatto" style="background-color:{{bg2}}" :src="item.imageUrl2" /></p>
          <p><b>Definizione:</b> {{ item.description2 }}</p>
        </div>
      </div>
    </div>

  </div>
  <div class="text-center">
    <a href="/abquestion/${next_question_id}" class="btn btn-primary" id="continua">Continua</a>
  </div>



</template>

<script>

import Cookie from "../modules/cookie.module.js";

const axios = require("axios");

export default {
  name: "coppia",

  // Utilizza variabile globale apiUrl
  inject: ["apiUrl"],

  data() {
    return {
      // dati contenuto
      item: [],
      
      // valore cookie legato al gioco
      cookie: 0,
      guessed_so_far: 0,
      toGuess: "",
      other: "",
      answer: 0, // 0 oppure 1, quale dei due oggetti vogliamo indovinare
      next_question_id: -1,
      bg1: "PaleGreen",
      bg2: "LightCoral",
    };
  },

  computed: {
    
  },

  watch: {
    /**
     * Osserva il cambiamento del parametro id nella url.
     * Chiama il metodo initUI per aggiornare i contenuti della pagina.
     * Reimposta lo stato iniziale del form feedback
     * Reset zoom componente mappa solo se presente
     */
    "$route.params.id"() {
      if (this.$route.name == "abquestion") {        
        this.initUI();
      }
    },
  },

  created: async function () {    
    await this.initUI();
  },

  mounted: function () {
    /**
     * Aggiunge listener click all'intero contenuto per ovviare al problema della direttiva v-html
     * V-html non propaga gli eventi
     */
    document.getElementById("informazioni").addEventListener("click", this.bodyClick);    
  },

  methods: {
    /**
     * Popola la UI
     */
    async initUI() {
        
      this.item = await this.getAbquestion();
      
      this.cookie = JSON.parse(Cookie.getCookie("abgame"));
      console.log(this.cookie);
      // Se il cookie abgame non esiste, torna alla home            
      if (typeof this.cookie.uuid === "undefined") {

        alert("Il cookie non esiste!");
        //return this.$router.push('/giochi');

      }

      this.guessed_so_far = JSON.parse(this.cookie.guessed_so_far);
      // list of indexes:
      let current_game_list = JSON.parse("[" + this.cookie.list_as_string + "]");
      let next_question_id = -1;
      let position = 0;
      while (position < current_game_list.length) {
        if (current_game_list[position] == this.item.id) {
          if (position + 1 < current_game_list.length)
            next_question_id = current_game_list[position + 1];
          else
            next_question_id = -1;
          break;
        }
        else {
          position++;
        }
      }      

      
      this.next_question_id = next_question_id;
      if (next_question_id == -1) { //ultima domanda, fine gioco
        let href_string = "/abgame/finished/" + this.item.abgame_id;
        document.getElementById("continua").setAttribute("href", href_string);        
      }
      else {
        document.getElementById("continua").setAttribute("href", "/abquestion/" + this.next_question_id);
      }

      // which one should we guess? let's decide:
      this.answer = Math.floor(Math.random() * 2);
      if (this.answer == 0) {
        this.toGuess = this.item.name1;
        this.other = this.item.name2;
        this.bg1 = "PaleGreen";
        this.bg2 = "LightCoral";
      }
      else {
        this.toGuess = this.item.name2;
        this.other = this.item.name1;
        this.bg1 = "LightCoral";
        this.bg2 = "PaleGreen";
      }
      
    },

    
    /**
     * Recupera dal database i dati relativi a questa domanda/coppia
     */
    async getAbquestion() {
      let id = this.$route.params.id;
      const response = await axios.get(this.apiUrl + "/api/abquestion/" + id);
      console.log(response.data);
      return response.data.item;
    },

    async setupVar(risposta) {
      //alert("hai scelto la risposta " + risposta + " la risposta corretta era " + this.answer);

      let guessed_correctly = 'T';
      if (risposta == this.answer) {
        alert("Esatto!");
        this.guessed_so_far++;
      }
      else {
        guessed_correctly = 'F';
        alert("Mi spiace, risposta sbagliata!");
      }
      document.getElementById("informazioni").hidden = false;
      document.getElementById("setup").hidden = true;
      // update cookie
      this.cookie.guessed_so_far = this.guessed_so_far;
      Cookie.setCookieJson("abgame", this.cookie, 1);
      let pair_name = "IT-"+this.item.name1+"-"+this.item.name2+"-" + guessed_correctly;
      //umami.track('game-answer', { name: pair_name });
      console.log(pair_name);
    },
    /*

template:
- onclick sull'immagine, controlla se è quella giusta
     - mostra spiegazioni e link alla prossima (Avanti)

    */
    async bodyClick() {
      return;
    }


  },

  components: {
    
  },
};
</script>
