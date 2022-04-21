<template>
<div id="cacciaAlTesoro">
<toolbar :title="name" :category_id="id"/>

  <h3>Benevento alla caccia al tesoro.</h3>
  <!-- Richiamo componente indovinello -->
  <indovinello
    indizi="1) Si trova all’interno di una corte interna, affacciata sul Corso. 2) Se te lo sei perso puoi recuperarlo d’estate sotto le stelle. 3) 'd'essai' "
    uno="Teatro Fabbri" due="Duomo di Forli" tre="Cinema Saffi" quattro="Arena Eliseo"
  ></indovinello>
  </div>
</template>


<script>
import toolbar from './toolbar.component.vue';
import  indovinello  from './indovinello.component.vue'
// let par = "";
// const par = setTimeout(function(){document.getElementById('parola')}, 50);

// console.log(prova)
 export default {
   name: 'cacciaAlTesoro',

   components: {
        indovinello,
        toolbar
    }
 }
</script>
