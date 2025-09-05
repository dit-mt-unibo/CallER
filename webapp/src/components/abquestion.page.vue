<!-- Visualizza i contenuti di un luogo -->

<template>
  
  <div id="place" class="container">

    <div class="row">
      <div class="col-12 titolo">{{ item.name1 }}</div>
    </div>
    <div class="row">
      <div class="col-12 titolo">{{ item.name2 }}</div>
    </div>
    
    <div class="place-container-img">
      <img class="place-img" :src="item.imageUrl1" />
    </div>
    <div class="place-container-img">
      <img class="place-img" :src="item.imageUrl2" />
    </div>
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
      
      // valore cookie legato al quiz
      cookie: 0,
      
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
    //document.getElementById("place").addEventListener("click", this.bodyClick);    
  },

  methods: {
    /**
     * Popola la UI
     */
    async initUI() {
        

        this.item = await this.getAbquestion();

      this.cookie = Cookie.getCookie("foobar");      
        
    },

    
    /**
     * Recupera dal database i dati relativi al luogo
     */
    async getAbquestion() {
      let id = this.$route.params.id;
      const response = await axios.get(this.apiUrl + "/api/abquestion/" + id);
      console.log(response.data);
      return response.data.item;
    },

    


  },

  components: {
    
  },
};
</script>
