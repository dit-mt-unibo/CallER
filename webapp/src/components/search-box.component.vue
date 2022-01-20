<!-- Componente box di ricerca -->

<template>
    <div id="search-box" class="search-box search-box-collapsed">
        <input type="text" name="search" id="search-field" placeholder="cerca tra i contenuti"  v-model="search" @input="openSuggestions" autocomplete="off"/>
        <div class="search-box-dropdown" v-if="showDropDown">
            <ul class="list-group">
                <li class="list-group-item" v-for="item in items" v-bind:key="item" @click="openResult(item.id)">
                    <h5 v-html="item.name"></h5>
                    <div class="intro-text" v-html="item.intro_text"></div>
                </li>
                <li class="list-group-item" align="right" v-if="itemsCounter > 3" @click="openAllResults">
                    <div>Vedi tutti i risultati ({{itemsCounter}})</div>
                </li>
            </ul>
            <p class="intro-text" align="center" v-if="itemsCounter == 0">
                Non sono stati trovati risultati
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {

    name: 'search-box',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],

    data() {
        
        return {
            // input utente
            search: "",
            // mostra/nasconde risultati ricerca
            showDropDown: false,
            // risultati ricerca
            items: [],
            // numero risultati. Mostra/nasconde link "Vedi tutti i risultati"
            itemsCounter: 0,

        }

    },

    methods: {

        /**
         * Apre la tendina con i risultati suggeriti.
         * La stringa di input deve contenere almeno 4 caratteri
         */
        async openSuggestions() {

            var strLength = this.search.length;

            if ( strLength > 3 ) {

                var response = null;
                this.showDropDown = true;
                
                try {

                    response = await axios.get(this.apiUrl + "/api/search?term=" + this.search);

                }
                catch (err) {
                    
                    console.log(err.message);

                }

                // Mostra solo 3 suggerimenti
                this.items = response.data.items.slice(0,3);
                this.itemsCounter = response.data.counter;

                // Evidenzia la stringa ricercata nei risultati
                this.items.forEach(item => {
                    
                    item.intro_text = this.textMarker(item.intro_text , strLength);
                    item.name = this.textMarker(item.name , strLength);

                });
            }
            else {

                this.showDropDown = false;

            }            

        },

        /**
         * Mostra/nasconde il box di ricerca
         */
        showHideSearchBox() {

            if ( document.getElementById("search-box").classList.contains("search-box-collapsed") ) {
                
                this.showSearchBox();

            }
            else {
                
                this.collapseSearchBox();

            }
        },

        /**
         * Apre il box di ricerca
         */
        showSearchBox() {

            document.getElementById("search-box").classList.remove("search-box-collapsed");
            document.getElementById("search-field").focus();

        },

        /**
         * Nasconde il box di ricerca
         */
        collapseSearchBox() {

            document.getElementById("search-box").classList.add("search-box-collapsed");
            document.getElementById("search-field").blur();

        },

        /**
         * Risponde all'evento click sul singolo risultato,
         * reindirizzando l'utente alla pagina collegata
         */
        openResult(id) {

            this.collapseSearchBox();
            let url = '/contenuto/' + id;
            this.$router.push(url);

        },

        /**
         * Risponde all'evento click sul link "Vedi tutti i risultati".
         * Apre una pagina con tutti i risultati trovati
         */
        openAllResults() {

            this.collapseSearchBox();
            let url = '/cerca/' + this.search + '/word';
            this.$router.push(url);

        },

        /**
         * Evidenzia la stringa ricercata all'interno di un testo
         * 
         * @param {string} text: testo in cui cercare l'input utente
         * @param {int} length: lunghezza input utente
         * @return string
         */
        textMarker(text , length) {

            var result = text;

            // Cerca le corrispondenze all'interno del testo
            var regExp = new RegExp(this.search, "gi");
            var matches = text.match(regExp);

            if ( matches != null ) {

                // array porzioni di testo
                var chunks = [];
                
                /**
                 * Per ogni corrispondenza, racchiude la porzione di stringa in un tag HTML span con classe highlight.                 
                 * Per preservare le maiuscolo, ad ogni ciclo il testo viene diviso in tre porzioni: before, word, after.
                 */
                matches.forEach(match => {
                                        
                    // Cerca la posizione della corrispondenza all'interno del testo
                    let pos = text.search(match);
                    // Salva tutto quello che c'è prima della corrispondenza
                    let before = text.slice(0 , pos);
                    // Estrae la porzione di stringa esatta da evidenziare. Preserva maiuscole
                    let word = text.slice(pos , pos + length);
                    // Salva tutto quello che c'è dopo la stringa evidenziata. Su questa porzione continua il ciclo forEach
                    let after = text.slice(pos + length);
                    
                    // aggiungo la porzione di testo all'array chunks
                    chunks.push(before + "<span class=\"highlight\">" + word + "</span>");

                    text = after;                            

                });
                
                /**
                 * Unisce nel risultato finale le porzioni di testo con le stringe evidenziate
                 * e l'eventuale parte finale del testo in cui non ci sono corrispondenze
                 */
                result = chunks.join("").concat(text);

            }

            return result;

        }

    }

}
</script>