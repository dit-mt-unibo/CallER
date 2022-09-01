<template>
    <div class="container-fluid thunt-max-width-layout thunt-container">
        <div class="row thunt-header">
            <div class="col-12">
                <span class="thunt-header-title">Caccia al tesoro</span>
            </div>
        </div>
        <div class="row" style="position:relative;">
                <img class="thunt-img-home" src="../../assets/images/treasure-hunt-completed.jpg"/>
                <div class="thunt-box-intro">
                    <p class="thunt-gradient" style="font-size:2.2rem; padding:20px 0;">
                        Completato!
                    </p>
                </div>
        </div>
        <div class="row mt-3">
            <div class="col-12">
                <p style="font-size: 1.3rem;">Congratulazioni!</p>
            </div>
        </div>
    </div>
    <div class="container-fluid thunt-max-width-layout">
        <div class="row">
            <div align="center" class="col-12 thunt-footer">
                <p>@2022 DIT - Forlì</p>
                <p>
                    <span @click="this.$router.push('/contenuto/81');">Credits</span>
                    <a href="https://www.unibo.it/it/ateneo/privacy-e-note-legali/privacy/privacy-sistema-portale-ateneo" target="_blank" class="ml-3">Cookie</a>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

import cookieModule from '../../modules/cookie.module.js';

export default ({
    
    created() {

        cookieModule.deleteCookie("treasure_hunt");

    }

})

</script>
