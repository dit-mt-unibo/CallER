<template>
<!-- <div>
  <div><h1>Gioco sondaggio</h1></div>
</div> -->
  <div class="card btn" id="app" @click="goTo()">
            <div class="card-header">
              Parola del giorno: <b id="parola">{{ info }}</b>
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
                <footer class="blockquote-footer">Definizione: {{ info2 }}</footer>
              </blockquote>
            </div>
            <!-- per chiamare una variabile in href -->
            <a v-bind:href=" info3 ">Link al dizionario</a>
    </div>
</template>

<script>

const axios = require('axios');


export default {

    name: 'glossary' ,

    // Utilizza variabile globale apiUrl
    inject: ['apiUrl'],
    data () {

        return {

            info: "",
            info2: "",
            info3: "",

        }

    } ,
    //parola del giorno
//     mounted () {
//     const log = await axios.post('this.apiUrl', { username: "Admin", password: "Admin" })
//     await axios.post('this.apiUrl', { username: "Admin", password: "Admin" })
//     .then(axios
//       .get(this.apiUrl + "/glossary/list")
//       // .then(response => (
//       //   // console.log(response.data)
//       //   ))
//     )
// },
    created : async function () {

        await this.login();

    } ,

    methods : {

        /**
         * Recupera la parola del giorno dal glossario
         */
        async login() {
            //per fare il login alla pagina ma da problemi di cors
            //Inoltre non credo sia una soluzione
            // const login = await axios.post(this.apiUrl+ "/check-account", {}, {
            //   headers: {
            //     "Access-Control-Allow-Origin": "*",
            //     "Access-Control-Allow-Credentials": "true",
            //     "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            //     "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
            //   },
            //   auth: {
            //     username: 'Admin',
            //     password: 'Admin'
            //   }
            // });
            // await console.log(login)

            //Istanzio la funzione per calcolare il giorno dell'anno
            const dayOfYear = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
            //Creo una variabile contente il giorno dell'anno
            let id = dayOfYear(new Date())
            //Se il giorno è superiore a 219 allora ne pesco uno random tra 0 e 219 perche il glossario al momento contine 219 parole
            //TODO non è la migiore suluzione perchè se un giorno viene aggiutna una parola non verra rappresentata se non
            //si cambiano i paramentri, sarebbe più ottimale ricevere prima il numero tatale delle parole e dopo di che settare l'if
            //in modo da regolarlo con il numero di parole
            if (id > 219){ id = Math.floor(Math.random() * 219)}
            const glossary = await axios.get(this.apiUrl+ "/glossary?id=" + id );
            await console.log(glossary.data)
            // const glossary = await axios.get(this.apiUrl+ "/glossary");

            this.info = glossary.data[0]["term"]
            this.info2 = glossary.data[0]["definition"]
            this.info3 = "https://www.dizionario-italiano.it/dizionario-italiano.php?parola="+ this.info
        },

        goTo() {

                    let url = '/parola/'
                    this.$router.push(url);
                },
    },

}
</script>

