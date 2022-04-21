<template>
  <div class="rounded-top place-content mb-5">
    <div class="col-12 mt-3 mb-5" align="center">
      <question :question="qst" :answers="answ" :correct="correct" />
    </div>
  </div>
</template>

<script>
import question from "./question.component.vue";

export default {
  name: "hunt",
  inject: ["apiUrl"],
  data() {
    return {
      qst: "",
      answ: [],
      correct: 0,
    };
  },

  created: async function () {
    await this.initUI();
    
  },
  methods: {
    async initUI() {
      this.qst = await this.getQuestion();
      this.answ = await this.getAnswers();
      this.correct = await this.getCorrect();
    },
    async getQuestion() {
      //Qui andrebbe la chiamata API al db per ricavare la domanda
      let res = "Che scritta si trova sul monumento?";
      let currentQuestion = res;
      return currentQuestion;
    },

    async getAnswers() {
      //Qui andrebbe la chiamata API al db per ricavare le risposte
      let res = ["Risposta 1", "Risposta 2", "Risposta 3"];
      let currentAnswers = res;
      return currentAnswers;
    },

    async getCorrect() {
      //Qui andrebbe la chiamata API al db per ricavare la risposta corretta
      let res = 2;
      let correctAnswer = res;
      return correctAnswer;
    },
  },
  components: {
    question,
  },
};
</script>
