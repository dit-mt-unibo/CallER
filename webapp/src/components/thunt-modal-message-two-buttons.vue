<!-- 

Componente finestra modale con due pulsanti, uno di conferma e uno di diniego

@slots
    default: testo messaggio visualizzato
    btnyes: etichetta pulsante conferma
    btnno: etichetta pulsante diniego

@events
    thunt-confirm: evento generato dal pulsante conferma
    thunt-deny: evento generato dal pulsante diniego

-->
<template>
    <transition name="fade">
        <div v-if="showModal" class="thunt-modal-box">
            <div class="thunt-modal-box-container thunt-modal-box-red">
                <div class="header"></div>
                <slot></slot>
                <div class="my-3" align="center">
                    <button type="button" class="thunt-modal-button-left" :class="[btnConfirmClass ? btnConfirmClass : 'thunt-button-green']" @click="this.$emit('thunt-confirm')">
                        <slot name="btnyes">Sì</slot>
                    </button>
                    <button type="button" class="thunt-modal-button-right" :class="[btnDenyClass ? btnDenyClass : 'thunt-button-red']" @click="this.$emit('thunt-deny')">
                        <slot name="btnno">No</slot>
                    </button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>


export default({

    name: "thuntModalMessageTwoButtons",
    
    props: [
        // mostra/nasconde la finestra modale
        'showModal' ,

        // aggiunta di classi css al pulsante di conferma
        'btnConfirmClass' ,

        // aggiunta di classi css al pulsante di diniego
        'btnDenyClass'
    ],

})
</script>
