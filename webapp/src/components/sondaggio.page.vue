
<template>
    <div class="mt-3 row" style="justify-content: center !important;">
        <div class="box-block-sondaggio">
            <h5><i class="fas fa-check-double"></i>Sondaggio</h5>
            <div class="box-block-body">
                <p>Rispondi correttamente al Sondaggio per vincere un buono sconto o un premio ad estrazione</p>
            </div>
            <div class="form-group">
        <label for="exampleFormControlInput1" style="padding: 5px 10px;">Domanda</label>
        <!-- creare un tabella con le domande per il sondaggio richiamarle da qui -->
        <div class="alert alert-dark" role="alert">
          Se sei un ragazzo che frequenta l'università dove preferisci trovarti per studiare con i compagni?
        </div>

        <div class="form-group">
        <label for="exampleFormControlTextarea1" style="padding: 5px 10px;">Risposta</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      </div>
          <div style="padding: 5px 10px" class="modal-footer" @click="show = !show">
            <!-- creare una funzione di salvataggio per le risposte -->
            <button type="button" class="btn btn-success" @click="alert()" >Invia</button>
              <Transition>
                <div v-if="show" class="box-block-body">
                <!-- creare una pagina di spiegazione per l'estrazione o premi -->
                <button type="button" class="btn btn-info" style= "text-align:center;">Premi</button>
                </div>
              </Transition>
              <button  type="button" class="btn btn-secondary" @click="goTo('giochi')"> Fine </button>
          </div>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'sondaggio' ,
  inject: ['apiUrl'],
  data() {
    return {
      show: false,

    }
  },
  methods : {
        alert(){
          Swal.fire({
            title: 'GRAZIE PER AVER RISPOSTO',
            text:   "clicca su premi per le informazioni sui vantaggi",
            icon: 'success',
        });
        },
        goTo(route) {
                    let url = `/${route}/`
                    this.$router.push(url);
                }
    }
}
</script>

