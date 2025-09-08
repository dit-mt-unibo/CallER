<template>
  <div class="container-fluid thunt-container">
    <div class="row thunt-header">
      <div class="col-12">
        <span class="thunt-header-title">Gioco delle coppie</span>
      </div>
    </div>
    <div class="row" style="position:relative;">
      <img class="thunt-img-home" src="../assets/images/abgame-home.jpg" />
      <div class="thunt-box-intro">
        <p class="thunt-gradient" style="font-size:2.2rem; padding:20px 0;">
          Completato!
        </p>
      </div>
    </div>
    <h2>Grazie per aver giocato con noi!</h2>

    <p>
      <span v-if="guessed_so_far == total_questions" class="titolo">Congratulazioni!</span>
      Sei riuscito a rispondere correttamente <br />{{guessed_so_far}}/{{total_questions}} a domande, o il {{ percentGuessed }}%
    </p>
    <p>Arrivederci!</p>

    <p>&nbsp;</p>
    <a href="/giochi">Prova un&quot;altra partita o un altro gioco!</a>
  </div>
</template>

<script>

  import Cookie from "../modules/cookie.module.js";

  //const axios = require("axios");

  export default {
    name: "coppia",

    // Utilizza variabile globale apiUrl
    inject: ["apiUrl"],

    data() {
      return {

        // valore cookie legato al gioco
        cookie: 0,
        guessed_so_far: 0,
        total_questions: 0,
        percentGuessed: 0,
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
        if (this.$route.name == "abgame-finished") {
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
      //document.getElementById("informazioni").addEventListener("click", this.bodyClick);
    },

    methods: {
      /**
       * Popola la UI
       */
      async initUI() {

        //this.item = await this.getAbquestion();

        this.cookie = JSON.parse(Cookie.getCookie("abgame"));
        console.log(this.cookie);
        // Se il cookie abgame non esiste, torna alla home
        if (typeof this.cookie.uuid === "undefined") {

          alert("Il cookie non esiste!");
          return this.$router.push('/giochi');

        }

        this.guessed_so_far = JSON.parse(this.cookie.guessed_so_far);
        let current_game_list = JSON.parse("[" + this.cookie.list_as_string + "]");
        this.total_questions = current_game_list.length;
        this.percentGuessed = Math.round(this.guessed_so_far * 100 / this.total_questions);

        // cancella il cookie per questo gioco
        Cookie.deleteCookie("abgame");
      },

      async bodyClick() {
        return;
      }


    },

    components: {

    },
  };
</script>
