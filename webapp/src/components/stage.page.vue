<!-- Componente tappa (copiato da quiz) -->

<template>
    <div class="mt-3 row">
        <div class="box-block">
            <div class="box-block-body">
                <p>Rispondi correttamente alla domanda per sbloccare il contenuto extra</p>
                <p class="quiz-question">{{quiz.question}}</p>
                <ul class="list-group">
                    <li class="list-group-item quiz-answer" v-for="(choice , id) in quiz.choices" v-bind:key="choice" :id="'list_' + id"
                        @click="checkAnswer(choice, id)">
                        <div :id="'text_' + id">{{choice}}</div>
                        <i :id="'icon_' + id" class="far fa-2x quiz-response-icon" @animationend="endAnimation($event , id)"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

import Cookie from '../modules/cookie.module.js';

export default ({

    name: 'quiz',

    props: ['quiz'],

    methods: {

        /**
         * Controllo risposta data dall'utente.
         * Se la risposta è corretta viene impostato un cookie di riferimento all'ID del luogo (quiz_ + place.id).
         * Applica animazione css per feedback all'utente
         *
         * @param {string} answer: risposta selezionata dall'utente
         * @param {int} elmID: ID elemento selezionato dall'utente
         */
        checkAnswer: function(answer , elmID) {

            var listElm = document.getElementById("list_" + elmID);
            var textElm = document.getElementById("text_" + elmID);
            var iconElm = document.getElementById("icon_" + elmID);

            const cookieName = "quiz_" +  this.quiz.place_id;

            if ( answer == this.quiz.answer ) {

                Cookie.setCookie(cookieName , 1 , 3650);

                iconElm.classList.add("fa-thumbs-up", "quiz-response-success");
                listElm.classList.add("quiz-response-success-bg");

            }
            else {

                iconElm.classList.add("fa-grimace", "quiz-response-error");
                listElm.classList.add("quiz-response-error-bg");

            }

            textElm.setAttribute("style" , "opacity: 0.4");
            iconElm.classList.add("quiz-response-animation");

        },

        /**
         * Listener fine animazione.
         * La classe css dell'animazione viene rimossa dall'elemento a cui è stata applicata.
         * Se la risposta è corretta lancia l'evento answer-right che serve a mostrare il contenuto bloccato
         *
         * @param {Object} e: oggetto Event
         * @param {int} elmID: ID elemento selezionato dall'utente
         */
        endAnimation: function(e, elmID) {

            const cookieName = "quiz_" +  this.quiz.place_id;

            var textElm = document.getElementById("text_" + elmID);

            e.target.classList.remove("quiz-response-animation");
            textElm.setAttribute("style" , "opacity: 1");

            if ( Cookie.getCookie(cookieName) == 1 ) {

                this.$emit('answer-right');

            }

        }


    }

})
</script>
