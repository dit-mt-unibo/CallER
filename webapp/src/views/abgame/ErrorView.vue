<template>
    <div class="container-fluid thunt-container">
        <div class="row thunt-header">
            <div class="col-12">
                <span class="thunt-header-title">Gioco delle coppie</span>
            </div>
        </div>        
        <div class="row">            
            <div class="col-12 mt-4" align="center">
                <img src="../../assets/images/icon-error.png"/>
            </div>          
            <div align="center" class="col-12 mt-3" style="font-size: 3.7rem; color:#e4252a;">
                OOOPS
            </div>
        </div>
        <div class="row">
            <div class="col-12 mt-4">
                <p style="font-size: 1.3rem;">
                    Un errore imprevisto non ti sta permettendo di continuare il gioco, premi il pulsante Home per provare a riprendere il gioco!
                </p>
            </div>
        </div> 
        <div class="row">
            <div class="col-12" align="center">
                <button class="thunt-button thunt-button-error" @click="this.$router.push('/gioco-ab')">Home</button>
            </div>
        </div>        
    </div>
    <div class="container-fluid">
        <div class="row">
            <div align="center" class="col-12 thunt-footer">
                <p>@2025 DIT - Forlì</p>
                <p>
                    <span @click="this.$router.push('/contenuto/81');">Credits</span>
                    <a href="https://www.unibo.it/it/ateneo/privacy-e-note-legali/privacy/privacy-sistema-portale-ateneo" target="_blank" class="ml-3">Cookie</a>
                </p>
            </div>
        </div>
    </div>
</template>
