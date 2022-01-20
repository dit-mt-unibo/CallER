<!-- Form per l'invio di feedback da parte dell'utente -->

<template>

    <div class="box-feedback mt-3 mb-3 row">
        <div id="box-header" class="col-12 pt-3">
            <slot name="header">
                <h5>È stato utile il contenuto?</h5>
            </slot>
            <div id="stars">
                <i class="far fa-star mr-2" name="star_1" data-value="1" data-selected="" @click="rate"></i>                
                <i class="far fa-star mr-2" name="star_2" data-value="2" data-selected="" @click="rate"></i>
                <i class="far fa-star mr-2" name="star_3" data-value="3" data-selected="" @click="rate"></i>
                <i class="far fa-star mr-2" name="star_4" data-value="4" data-selected="" @click="rate"></i>
                <i class="far fa-star" name="star_5" data-value="5" data-selected="" @click="rate"></i>
            </div>
        </div>            
        <div id="box-textarea" class="col-12">                
            <input type="hidden" id="rate" name="rate" />
            <div class="form-group">
                <label>
                    Commento <span class="small">(opzionale)</span>
                </label>
                <textarea id="comment" name="comment" class="form-control" rows="5" maxlength="255" placeholder="Massimo 255 caratteri consentiti"></textarea>                                        
            </div>
            <div class="box-info-rate">
                <p>
                    La raccolta e l'analisi dei dati avviene in forma anonima.
                </p>
            </div>                
            <div class="box-btn-rate">
                <button type="button" class="btn btn-rate" @click="send">Invia</button>
            </div>                        
        </div>
        <div id="box-sentform-rate" class="box-sentform-rate">
            <p align="center"><i class="far fa-3x fa-thumbs-up"></i></p>
            <p>La tua valutazione è stata inviata!</p>
            <p>Grazie mille per la collaborazione!</p>
        </div>
    </div>
    
</template>

<script>

const axios = require('axios');

export default {

    name: 'feedback-form',

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],    

    props: ['place_id'],

    methods : {

        /**
         * Reimposta lo stato iniziale del form.
         * Metodo chiamato nella pagina contenuto, quando si naviga da un contenuto all'altro.         
         */
        refresh() {

            window.$( "#box-header" ).show();
            window.$( "#box-textarea" ).hide();
            window.$( "#box-sentform-rate" ).hide();

            var stars = document.querySelectorAll(".fa-star");

            stars.forEach(item => {
                
                item.classList.replace("fas" , "far");
                item.setAttribute("data-selected" , "");

            });

            document.getElementById("comment").value = "";
            document.getElementById("rate").value = "";

        },

        /**
         * Listener click oggetti "Stelle".
         * Mostra o nasconde la textarea per il commento e il pulsante "Invia".
         * 
         * @param {Event} e: oggetto Event
         */
        rate(e) {

            const obj = e.target;
            let value = obj.getAttribute("data-value");
            let selected = obj.getAttribute("data-selected");

            var stars = document.querySelectorAll(".fa-star");

            stars.forEach(item => {
                
                item.classList.replace("fas" , "far");
                item.setAttribute("data-selected" , "");

            });            

            if ( selected == "" ) {

                for (let index = 1; index <= value; index++) {
                    
                    var starsObj = document.getElementsByName("star_" + index)[0];
                    starsObj.classList.replace("far" , "fas");
                    starsObj.setAttribute("data-selected" , "selected");
                    
                }

                window.$( "#box-textarea" ).fadeIn(500);                
                document.getElementById("rate").value = value;

            }
            else {

                window.$( "#box-textarea" ).fadeOut(500);
                document.getElementById("rate").value = "";

            }

        },

        /**
         * Invia voto e commento al server
         */
        async send() {

            let url = this.apiUrl + "/feedback";
            let rate = document.getElementById("rate").value;
            let comment = document.getElementById("comment").value;

            var formData = new FormData();
            formData.append("rate" , rate);
            formData.append("comment" , comment);
            formData.append("place_id" , this.place_id);            

            await axios.post(url , formData).catch( function(error) {
                console.log(error);
            });

            window.$( "#box-header" ).fadeOut(500);

            window.$( "#box-textarea" ).fadeOut(500 , function() {                                

                window.$( "#box-sentform-rate" ).fadeIn(800);

            });

            document.getElementById("comment").value = "";
            document.getElementById("rate").value = "";

        }
    },

}

</script>
