<template>
  <toolbar :title="name" :category_id="id"/>
  <div>
    <div class="container-fluid mt-3 mb-3">
        <div class="row"><div class="col-12">Sezione giochi per cimentarsi in sfide e vincere premi.</div></div>
    </div>
    <div class="container">
      <div class="row justify-content-start">
            <!-- <listitems key="./logo.png" item="./logo.png" href="./logo.png" intro_text="Caccia al tesoro" /> -->
             <div class="col-sm-12 col-lg-4 col-md-8 mb-3" id="app" @click="goTo('indovinello')">
               <div class="card" data-link="">
                 <img id="img-top" class="card-img-top" src="../assets/images/caccia-al-tesoro.png">
                    <div class="card-body"><h5 class="card-title">Caccia al tesoro</h5>
                      <p class="card-text card-text-truncate"></p></div>
                </div>
              </div>
              <div class="col-sm-12 col-lg-4 col-md-8 mb-3"  id="app" @click="goTo('sondaggio')">
               <div class="card" data-link="">
                 <img id="img-top" class="card-img-top" src="../assets/images/sondaggio.jpg">
                    <div class="card-body"><h5 class="card-title">Sondaggio</h5>
                      <p class="card-text card-text-truncate"></p></div>
                </div>
              </div>
      </div>
    </div>
  </div>
</template>


<script>
// import listitems from './listitems.component.vue';
import toolbar from './toolbar.component.vue';


 export default {
   name: 'giochi',
   components: {
        toolbar,
        // listitems
    },

    methods : {

        goTo(route) {
                    let url = `/${route}/`
                    this.$router.push(url);
                }
    }
 }
</script>
