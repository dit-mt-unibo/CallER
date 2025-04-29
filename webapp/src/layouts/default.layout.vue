<template>
    
    <div class="container-fluid">
        <div class="row header" @click="this.$router.push('/');">
            <div class="col-12 d-none d-lg-block d-xl-block">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <img class="logo" alt="Vue logo" src="../assets/images/logo.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 d-block d-lg-none d-xl-none">
                <img class="logo" alt="Vue logo" src="../assets/images/logo.png">
            </div>
        </div>
    </div>        
    <div class="container main-container pb-3">
      <router-view />
      <div align="center"><a href="/caccia-al-tesoro">Partecipa alla Caccia al Tesoro!</a></div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div align="center" class="col-12 footer">          
          <p class="info d-none d-sm-block d-md-block d-lg-block d-xl-block">
            Dipartimento di Interpretazione e Traduzione - DIT - Forlì
          </p>
          <p class="info d-block d-sm-none d-md-none d-lg-none d-xl-none">
            Dipartimento di Interpretazione e
          </p>
          <p class="info d-block d-sm-none d-md-none d-lg-none d-xl-none">
            Traduzione - DIT - Forlì
          </p>
          <p>
            <span @click="this.$router.push('/contenuto/81');">Credits</span>
            <a href="https://www.unibo.it/it/ateneo/privacy-e-note-legali/privacy/privacy-sistema-portale-ateneo" target="_blank" class="ml-3">Cookie</a>
          </p>
        </div>
      </div>
    </div>     
    
</template>
