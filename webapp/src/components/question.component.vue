<template>
  <div>
    <div class="card text-center" style="width: 36rem">
      <div class="card-body">
        <div align="center" style="height: 40vh; width: 35vw">
          <location id="loc" />
        </div>
        <div class="card-header">
          <b id="domanda">{{ question }}</b>
        </div>

        <div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="1"
            />
            <label class="form-check-label" for="exampleRadios1">
              {{ answers[0] }}
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="2"
            />
            <label class="form-check-label" for="exampleRadios2">
              {{ answers[1] }}
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="exampleRadios"
              id="3"
            />
            <label class="form-check-label" for="exampleRadios3">
              {{ answers[2] }}
            </label>
          </div>
        </div>

        <div class="text-center">
          <div class="btn btn-success text-center" id="app" @click="answer()">
            Rispondi
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import location from "./location.component.vue";

export default {
  props: ["question", "answers", "correct"],
  inject: ["apiUrl"],

  data() {
    return {
      latLng: [],
    };
  },

  components: {
    location,
  },

  methods: {
    answer() {
      //let loc = String(document.getElementById("loc").latlng);
      if (document.getElementById("1").checked) {
        if (this.correct == 1) {
          alert("Risposta corretta " );
        }else{
        alert("Risposta errata");}
      } else if (document.getElementById("2").checked) {
        if (this.correct == 2) {
          alert("Risposta corretta " );
        }else{
        alert("Risposta errata");}
      } else if (document.getElementById("2").checked) {
        if (this.correct == 3) {
          alert("Risposta corretta ");
        }else{
        alert("Risposta errata");}
      } else {
        alert("Rispondi alla domanda");
      }
    },
  },
};
</script>
