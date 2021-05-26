/**
 * <audio-form>
 * 
 * Shows audio player for vocaroo file.
 * By button "Modifica" shows a form to update the link
 * 
 * @type {Component}
 * 
 * 
 * @event submit: form submit
 * @event save: save button click event
 * @event changeMode: switches between form mode and view mode
 * @event deleteLink: removes link
 * 
 */

 parasails.registerComponent('audioForm', {

    props: [
      
      'syncing',      
      'formMessage',
      'item',
      'mode', // view (shows audio player) || form (shows form)      
    
    ],

    data: function () {
     
        return {
          //
        };
  
      },
    
      beforeMount: function() {
        //
      },

    template: `
    <div class="card" style="width:50%">      
      <div v-if="mode == 'view'">
        <p v-if="!item.audio" class="card-text" style="margin-top:20px;">
            Non hai ancora aggiunto un audio
        </p>
        <div>
            <iframe v-if="item.audio" width="300" height="60" :src="item.audio" frameborder="0" allow="autoplay"></iframe>
        </div>
        <div style="margin:10px 0 20px 0;">
            <button type="button" v-if="!item.audio" @click="changeMode('form')" class="btn btn-success col-2">Aggiungi</button>
            <button type="button" v-if="item.audio" @click="deleteLink" class="btn btn-danger mr-2 col-2">Rimuovi</button>
            <button type="button" v-if="item.audio" @click="changeMode('form')" class="btn btn-primary col-2">Modifica</button>
        </div>
      </div>
      <div v-if="mode == 'form'" class="card-body">        
        <form id="form-image" @submit.prevent="submit()">          
          <div class="form-group col-11">
            <h5 align="left">Inserisci link audio</h5>                  
            <input type="text" name="audio" class="form-control" id="audio" 
                    placeholder="url audio es: https://voca.ro/xxx" autocomplete="off" />
            <p align="left" v-if="formMessage" class="text-danger">{{formMessage}}</p>            
          </div>
          <div class="row justify-content-center">
            <button @click="changeMode('view')" type="button" class="btn btn-secondary mr-2 col-2">Annulla</button>              
            <button @click="save()" type="submit" class="btn btn-success col-2">
              <span class="button-text" v-if="!syncing">Salva</span>
              <span class="clearfix" v-if="syncing">Invio in corso...</span>
            </button>
          </div>
        </form>
      </div>
    </div>    
    `,

    mounted: async function () {

      this.syncing = false;
      this.formMessage = '';      
      this.mode = 'view';

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {
        
        save: async function() {
        
            $( "#audio" ).removeClass('is-invalid');
            this.formMessage = '';
            this.$emit('click');

        },

        changeMode: function(mode) {

        this.syncing = false;
        this.mode = mode;
        this.formMessage = '';        

        },

        deleteLink: async function() {

            this.syncing = true;

            var data = { id: this.item.id , audio: ''}

            // Submit the form
            var failedWithCloudExit;

            var result =await Cloud['updateAudio'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
                this.formMessage = "Errore durante la rimozione del link";          
            }

            this.syncing = false;

            // Data update was successful
            if (!failedWithCloudExit) {

                this.item.audio = result.audio;
                this.mode = 'view';          

            }

        },

        submit: async function() {        

            // the field is required
            if ( $( "#audio").val() == '' ) {

                $( "#audio" ).addClass('is-invalid');
                this.formMessage = 'Campo obbligatorio';
                return;
                
            }
            
            // validate field 
            if ( this.validate( $( "#audio" ).val() ) === false ) {

                $( "#audio" ).addClass('is-invalid');
                this.formMessage = 'Link vocaroo non valido';
                return;

            }

            this.syncing = true;

            var data = { id: this.item.id , audio: $( "#audio" ).val() }

            // Submit the form
            var failedWithCloudExit;

            var result =await Cloud['updateAudio'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
                this.formMessage = "Errore durante l'aggiornamento del link";          
            }

            this.syncing = false;

            // Data update was successful
            if (!failedWithCloudExit) {

                this.item.audio = result.audio;
                this.mode = 'view';          

            }
            
        },
        
        validate: function(link) {                    
            
            const pattern = /^https:\/\/voca.ro\/|^https:\/\/www.vocaroo.com\/|^https:\/\/vocaroo.com\//;
            const match = link.match(pattern);
                    
            return ( _.isNull(match) === false );                

        },              

  
    }

});