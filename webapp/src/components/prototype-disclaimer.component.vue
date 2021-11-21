<!-- Finestra modale visualizza informativa contenuti in fase di revisione -->

<template>    
    <div class="modal fade" id="modalProto" tabindex="-1" role="dialog" aria-labelledby="modalProto" aria-hidden="true">
        <div class="modal-dialog" style="max-width:1300px;" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Informativa contenuti
                    </h5>
                </div>
                <div class="modal-body">
                    <p>
                        I contenuti e le attività dell'app sono in fase di revisione e aggiornamento.
                    </p>
                    <p>
                        Eventuali errori e informazioni incomplete saranno corrette nella successiva versione dell'app, attualmente in corso di sviluppo.
                    </p>
                    <p>
                        Per suggerimenti e segnalazioni, scrivi a <a href="mailto:progetto.caller@gmail.com">progetto.caller@gmail.com</a>.
                    </p>
                    <div align="center" class="mt-3 mb-3">
                        <button type="button" class="btn btn-success" data-dismiss="modal">Ho capito</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Cookie from '../modules/cookie.module.js';

export default {
    
    name: 'proto-disclaimer',

    mounted: function() {

        let cookie_proto = Cookie.getCookie("cookie_proto");

        /**
         * Mostra la finestra con l'informativa se cookie_proto è 0.
         * Resta in ascolto dell'evento hidden.bs.modal propagato al momento della chiusura della finestra (https://getbootstrap.com/docs/4.0/components/modal/#events)
         * Quando la finestra si chiude imposta cookie_proto a 1
         */
        if ( cookie_proto == "0" ) {

            window.$( '#modalProto' ).on('hidden.bs.modal', function() {
                
                Cookie.setCookie("cookie_proto" , 1 , 365);

            })
            .modal('show');

        }

    }

}
</script>