<!-- Visualizza i contenuti di un luogo -->

<template>
  
  <div id="place" class="container">
    <toolbar :title="categoryName" :category_id="item.category_id" />
    <div class="row">
      <div class="col-12 titolo">{{ item.name }}</div>
      <div class="col-12 livello">
        <span v-if="item.level == 0" class="livello-facile"
          >Livello: facile</span
        >
        <span v-if="item.level == 1" class="livello-intermedio"
          >Livello: intermedio</span
        >
        <span v-if="item.level == 2" class="livello-difficile"
          >Livello: difficile</span
        >
      </div>
    </div>
    <div class="row mt-4 mb-3">
      <div class="col-12 intro-text" v-html="item.intro_text"></div>
    </div>
    <div class="row rounded-top place-content pt-3">
      <div class="col-12">
        <div class="box-place-img">
          <div class="place-container-img">
            <img class="place-img" :src="imagePath" />
            <a
              v-if="item.lat && item.long"
              class="map-icon"
              :href="
                'https://www.google.com/maps/search/?api=1&query=' +
                item.lat +
                '%2C' +
                item.long
              "
              target="_blank"
            >
              <i class="fas fa-map-marker-alt"></i>
            </a>
          </div>
          <p id="caption" class="caption card-text-truncate" @click="expand">
            {{ item.image_caption }}
          </p>
        </div>
        <span v-html="item.full_text"></span>
      </div>
      <div align="center" class="col-12 mt-3 mb-3" v-if="item.video">
        <iframe
          v-if="!isBlocked"
          class="youvideo"
          :src="item.video"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
      </div>
      <div align="center" class="col-12 mt-3 mb-3" v-if="item.audio">
        <iframe
          v-if="!isBlocked"
          class="vocaroo"
          width="600"
          height="70"
          :src="item.audio"
          frameborder="0"
          allow="autoplay"
        ></iframe>
      </div>
      <div class="col-12 mt-3 mb-3" v-if="item.extra_text && !isBlocked">
        <div v-html="item.extra_text"></div>
      </div>
      <div align="center" class="col-12 mb-3 d-xl-none">
        <button class="btn btn-success btn-sm" @click="scrollTop">Torna su</button>
      </div>
    </div>
    <quiz v-if="isBlocked" v-bind:quiz="item.quiz" v-on:answer-right="unlock" />
    <div v-if="mapShow" class="row mt-3 mb-3">
      <div align="center" class="col-12" style="padding:0px; border:1px solid rgba(0, 0, 0, 0.325);">
        <mapping ref="mapping" :markers="mapLatLong" :center="mapCenter" />
      </div>
    </div>
    <feedback :place_id="item.id" ref="feedback" />
    <div class="row box-related mb-3" v-if="item.category_id != 1">
      <ul class="list-group">
        <li class="list-group-item">
          <h5>Continua a leggere</h5>
        </li>
        <li
          class="list-group-item"
          v-for="rItem in relatedItems"
          v-bind:key="rItem"
          @click="goTo(rItem.id, 'place')"
        >
          <div class="box-related-img">
            <img
              id="img-top"
              class="card-img-mini"
              :src="this.apiUrl + '/images/contenuti/' + rItem.imageUID"
            />
          </div>
          <div class="box-related-entry card-text-truncate">
            <div class="box-related-entry-level">
              <span v-if="rItem.level == 0" class="livello-facile"
                >Livello: facile</span
              >
              <span v-if="rItem.level == 1" class="livello-intermedio"
                >Livello: intermedio</span
              >
              <span v-if="rItem.level == 2" class="livello-difficile"
                >Livello: difficile</span
              >
            </div>
            <div>{{ rItem.name }}</div>
          </div>
          <div style="clear: both"></div>
        </li>
      </ul>
    </div>
    <div
      class="row rounded-top box-tags mb-3"
      v-if="item.tags && item.category_id != 1"
    >
      <h5>Tags</h5>
      <ul>
        <li v-for="tag in item.tags" :key="tag" @click="search(tag)">
          #{{ tag }}
        </li>
      </ul>
    </div>    
    <modalGlossary :title="glossary.term" :text="glossary.definition" />    
  </div>

</template>

<script>
import modalGlossary from "./modal-glossary.component.vue";
import quiz from "./quiz.component.vue";
import feedback from "./feedback.component.vue";
import toolbar from "./toolbar.component.vue";
import Cookie from "../modules/cookie.module.js";
import mapping from "./mapping.component.vue";


const axios = require("axios");

export default {
  name: "place",

  // Utilizza variabile globale apiUrl
  inject: ["apiUrl"],

  data() {
    return {
      // dati contenuto
      item: [],
      // contenuti suggeriti all'utente
      relatedItems: [],
      // oggetto da passare al componente modal-glossary
      glossary: { term: "", definition: "" },
      // valore cookie legato al quiz
      cookie: 0,
      // nome categoria
      categoryName: "",
      // coordinate mappa componente mapping
      mapLatLong: [44.2227, 12.0407],
      // coordinate centro mappa componente mapping
      mapCenter: [44.2227, 12.0407],
      // mostra/nasconde componente mapping
      mapShow: false,
    };
  },

  computed: {
    /**
     * Imposta attributo src immagine
     */
    imagePath() {
      if (typeof this.item.imageUID === "undefined") return "";

      return this.apiUrl + "/images/contenuti/" + this.item.imageUID;
    },

    /**
     * Blocca o sblocca un contenuto
     */
    isBlocked() {
      if (typeof this.item.quiz === "undefined") return false;

      if (this.cookie == 1) return false;

      return true;
    },
  },

  watch: {
    /**
     * Osserva il cambiamento del parametro id nella url.
     * Chiama il metodo initUI per aggiornare i contenuti della pagina.
     * Reimposta lo stato iniziale del form feedback
     */
    "$route.params.id"() {
      if (this.$route.name == "place") {        
        this.initUI();
        this.$refs.feedback.refresh();
        this.$refs.mapping.resetZoom();
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
    document.getElementById("place").addEventListener("click", this.bodyClick);    
  },

  methods: {
    /**
     * Popola la UI
     */
    async initUI() {
        /**
         * Scroll in cima alla pagina.
         * Rimedia al problema della navigazione all'interno della stessa route /contenuto/
         */
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });

        this.item = await this.getPlace();
        this.relatedItems = await this.getRelatedPlaces();
        this.categoryName = await this.getCategoryName();
        this.mapLatLong = [this.item.lat , this.item.long];
        this.mapCenter = [this.item.lat , this.item.long];
        
        this.mapShow = ( this.item.lat != null && this.item.long != null );

        let cookieName = "quiz_" + this.item.id;
        this.cookie = Cookie.getCookie(cookieName);      
    },

    /**
     * Recupera dal database i dati relativi al luogo
     */
    async getPlace() {
      let id = this.$route.params.id;
      const response = await axios.get(this.apiUrl + "/place/" + id);

      return response.data.item;
    },

    /**
     * Recupera dal database i dati dei luoghi consigliati
     */
    async getRelatedPlaces() {
      let id = this.$route.params.id;
      let cat_id = this.item.category_id;

      const response = await axios.get(
        this.apiUrl + "/place-related/" + id + "/" + cat_id
      );

      return response.data.items;
    },

    /**
     * Restituisce il nome della categoria del luogo.
     * Restituisce una stringa vuota se la categoria è la Home ID = 1
     */
    async getCategoryName() {
      let cat_id = this.item.category_id;

      if (cat_id == 1) return "";

      const response = await axios.get(this.apiUrl + "/category/" + cat_id);

      return response.data.item.name;
    },

    /**
     * Listener per l'evento click su <div id="place">
     *
     * @param {Object} e: oggetto Event
     */
    async bodyClick(e) {
      if (e.target.className === "glossary") {
        e.preventDefault();

        const response = await axios.get(
          this.apiUrl + "/glossary?name=" + e.target.dataset.id
        );

        if (typeof response != "undefined") {
          this.glossary.term = response.data[0].term;
          this.glossary.definition = response.data[0].definition;

          window.$("#modalGlossary").modal("show");
        }
      }
    },

    /**
     * Sbocca il contenuto bonus impostando la variabile cookie a 1
     */
    unlock() {
      this.cookie = 1;
    },

    /**
     * Reindirizza alla pagina cerca
     *
     * @param {string} tag: stringa filtro
     */
    search(tag) {
      let url = "/cerca/" + tag + "/tag";
      this.$router.push(url);
    },

    /**
     * Reindirizza alla pagina /contenuto/:id se l'evento click è generato da uno degli elementi dell'elenco "Continua a leggere"
     * Reindirizza alla pagina /contenuti/:id se l'evento click è generato dal link nome categoria
     *
     * @param {int} id : ID contentuo
     * @param {string} type: 'place' | 'category'
     */
    goTo(id, type) {
      let url = type == "place" ? "/contenuto/" + id : "/contenuti/" + id;
      this.$router.push(url);
    },

    /**
     * Listener evento click sulla didascalia della foto.
     * Espande/riduce testo didascalia
     *
     * @param {Event} e: oggetto Event
     */
    expand(e) {
      const obj = e.target;

      if (obj.classList.contains("card-text-truncate")) {
        obj.classList.remove("card-text-truncate");
      } else {
        obj.classList.add("card-text-truncate");
      }      
    },

    /**
     * Listener evento click pulsante "Torna su".
     * Scorre la pagina fino in cima. 
     */
    scrollTop() {

        document.body.scrollTo({ top:0 , left:0 , behavior: 'smooth' });
        document.documentElement.scrollTo({ top:0 , left:0 , behavior: 'smooth' });

    }

  },

  components: {
    modalGlossary,
    quiz,
    feedback,
    toolbar,
    mapping,
  },
};
</script>
