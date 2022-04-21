<template>
  <div>
    <h4>Indovina l'indovinello per proseguire con la caccia al tesoro:</h4>
    <br>
    <h5>Indizzi:</h5>
    <h6>{{indizi}}</h6>
      <br>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" v-model="checked">
        <label class="form-check-label" for="exampleRadios1">
           {{ uno }}
        </label>
        <br>

        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" v-model="checked">
        <label class="form-check-label" for="exampleRadios2">
           {{ due }}
        </label>
        <br>

        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" v-model="checked">
        <label class="form-check-label" for="exampleRadios3">
           {{ tre }}
        </label>
        <br>

        <!-- vaolre corretto da passare come props -->
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios4" value="option4" v-model="checked">
        <label class="form-check-label" for="exampleRadios4">
           {{ quattro }}
        </label>
        <br>
      </div>
      <br>
      <button type="button" class="btn btn-success" @click="check()">Check</button>

  </div>
</template>

<script>

export default {
    props: {
    indizi: String,
    uno: String,
    due: String,
    tre: String,
    quattro: String
  },
  data() {
    return {
      //variabile che cambia al click delle possibile soluzione
      checked: " "
    }
  },
    name: 'indovinello' ,

    methods : {
        check() {
          //Solo se la risposta è corretta esegue il comando successivo
          if (this.checked === "option4")
          {
           let url = '/hunt/'
           this.$router.push(url);
          }
        },

    },
}
</script>

