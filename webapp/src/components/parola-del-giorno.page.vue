//TODO al momento la pagina non visualizza informazioni agiguntive di quelle gia presenti nel popUp in home
//Il link al dizzionario sarebbe da visulizzare solo qui?
//Aggiungere esempio ma dove lo prendo in italiano non ho trovato dizionari gratis
//Agigungere foto anche questa non saprei dove prenderla
//Valutare se avra senso

<template><div id="parola">
<toolbar :title="name" :category_id="id"/>
<glossary></glossary>
<!-- <div><a href="https://www.dizionario-italiano.it/dizionario-italiano.php?parola=spaghetti">Link al dizionario</a></div> -->
</div>

</template>

<script>
import toolbar from './toolbar.component.vue';
import  glossary  from './parola-del-giorno.component.vue'
// let par = "";
// const par = setTimeout(function(){document.getElementById('parola')}, 50);

// console.log(prova)
 export default {
   name: 'parola',

   components: {
        glossary,
        toolbar
    },
  glossary
 }
</script>
