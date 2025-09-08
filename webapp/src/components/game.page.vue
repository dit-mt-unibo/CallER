<!-- home page per un gioco A/B -->

<template>
  <div class="row" style="position:relative;">
    <img class="thunt-img-home" src="../assets/images/abgame-home.jpg" />
    <!--
  <div class="thunt-box-intro thunt-gradient">
    <p class="thunt-box-intro-first-line">Gioco delle coppie</p>
    <p class="thunt-box-intro-second-line">Gioca, scopri, impara</p>
  </div>
    -->
  </div>
  <div class="container-fluid mt-3 mb-3">
    <div class="row">
      <div class="col-12 titolo" v-html="name"></div>
    </div>
    <div class="row">
      <div class="col-12 h4" v-html="description"></div>
    </div>
  </div>
  <div class="container">
    <div class="d-grid gap-2 col-6 mx-auto">      
      <!-- al submit/click, chiama Player.create() che deve creare e ritornare un uuid -->
      <a type="button" class="btn btn-primary" id="startButton">Cominciamo</a>      
    </div>
  </div>
</template>

<script>

  import Cookie from '../modules/cookie.module.js';
  import Slicer from '../modules/slicer.module.js';
const axios = require('axios');

export default {

    name: 'gioco A/B' ,

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data () {

        return {

            // nome gioco
            name: "",
            // descrizione gioco
            description: "",
            // domande del gioco
            children: [],
            // base url per link alla pagina domande
            href: "/domande/",

        }

    } ,

    watch: {

       async "$route.params.id" () {

            if ( this.$route.name == "abgame" ) {

              let data = await this.getGamedata();
              console.log(data);

            }

        },
      
    },

    created : async function () {

      await this.getGamedata();

    },


    methods: {



      async getGamedata() {
        /**
        * Recupera i dati relativi al gioco con una chiamata API 
        */
        let id = this.$route.params.id;
        const response = await axios.get(this.apiUrl + "/api/abgame/" + id);
        
        console.log(response.data);

        this.name = response.data.item.name; // perche' non si chiama 'item' il primo elemento del json data come per l'oggetto place?
        this.description = response.data.item.description;

        this.children = response.data.children;        
        // let's extract a list of abquestion IDs:
        let question_ids = this.children.map(a => a.id);
        let questions_to_ask = Slicer.generateQuestionSet(question_ids);
        let list_as_string = questions_to_ask.join();
        console.log("il gioco chiedera' questi indici:" + list_as_string);

        let uuid = crypto.randomUUID();
        // create a cookie to represent this game: a unique user id, this game id, the list of indexes to questions 
        let cookie = {          
          uuid: uuid,
          abgame_id: id,
          list_as_string,
          guessed_so_far: 0,
          step: 1,
        };
        Cookie.setCookieJson("abgame", cookie, 1);

        this.first_question_id = questions_to_ask[0];
        console.log("Prima domanda: "+this.first_question_id);
        // set href of button to this question id:
        document.getElementById("startButton").setAttribute("href", "/abquestion/" + this.first_question_id);
        
        return response.data;
   

      },


      
      //TODO:
      /*
      


      mostra link alla prima domanda 'iniziamo'



      */
    },


    components: {
       

    }


}

</script>
