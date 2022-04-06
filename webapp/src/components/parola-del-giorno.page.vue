<template><div id="parola">
<glossary></glossary>
<!-- <div><a href="https://www.dizionario-italiano.it/dizionario-italiano.php?parola=spaghetti">Link al dizionario</a></div> -->
</div>

</template>

<script>
import  glossary  from './parola-del-giorno.component.vue'
// let par = "";
// const par = setTimeout(function(){document.getElementById('parola')}, 50);

// console.log(prova)
 export default {
   name: 'parola',

   components: {
        glossary
    },
  glossary
 }
</script>
