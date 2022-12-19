/**
 * <audio-form>
 * 
 * Shows audio player and allows to upload a new file to the server. 
 * 
 * @type {Component}
 * 
 */

 parasails.registerComponent('audioPlayerForm', {

    props: ['item'],

    data: function () {
     
        return {
            // src attribute of the tag <audio>
            audioSrc: "",
            // show/hide loader
            syncing: false,
            // form message
            formMessage: "",
            // view (shows audio player) || form (shows form)
            mode: 'view'
        };
  
    },    

    template: `
    <div class="card" style="width:50%">      
      <div v-if="mode == 'view'">
        <p v-if="!item.audio" class="card-text" style="margin-top:20px;">
            Carica un nuovo file audio
        </p>
        <div v-if="item.audio" style="margin-top:20px;">
            <audio controls :src="audioSrc"/>            
        </div>
        <div class="card-body" align="center">
            <button type="button" v-if="!item.audio" @click="changeMode('form')" class="btn btn-success">Carica</button>
            <button type="button" v-if="item.audio" @click="deleteAudio" class="btn btn-danger mr-2 col-2">Rimuovi</button>
            <button type="button" v-if="item.audio" @click="changeMode('form')" class="btn btn-primary col-2">Modifica</button>
        </div>
      </div>
      <div v-if="mode == 'form'" class="card-body">        
        <form id="form-audio" @submit.prevent="submit()">          
          <div class="form-group col-11">
            <h5 align="left">Carica nuovo audio</h5>
            <div class="input-group">            
                <input type="text" name="audio" class="form-control" id="audio"
                        placeholder="solo mp3 massimo 1MB" readonly autocomplete="off" />
                <button type="button" @click="openResources()" class="btn btn-outline-secondary">Sfoglia</button>
            </div>
            <p align="left" v-if="formMessage" class="text-danger">{{formMessage}}</p>            
            <input type="file" style="display:none;" ref="file" name="audiofile" v-on:change="setFileAudio()"/>
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

    mounted: function () {

      this.audioSrc = '/glossario/' + this.item.audioUID;

    },
  
    methods: {
        
        /**
         * Listener button save click event.
         * Submits form
         */
        save: function() {
        
            $( "#audio" ).removeClass('is-invalid');
            this.formMessage = '';
            this.$emit('click');

        },

        /**
         * Changes GUI among display mode: 'view' , 'form' and 'success'
         * @param {string} mode 'view' | 'form' | 'success'
         */
        changeMode: function(mode) {

            this.syncing = false;
            this.mode = mode;
            this.formMessage = '';        

        },

        /**
         * Listener button browse click event.
         * Opens file explorer
         */
        openResources: function() {

            this.$refs.file.click();

        },

        /**
         * Sets the value of the field audio
         */
        setFileAudio: function() {

            $( "#audio" ).val( this.$refs.file.files[0].name );

        },

        /**
         * Calls API to remove file from server
         */
        deleteAudio: async function() {

            this.syncing = true;

            var data = { 
                id: this.item.id , 
                audio: '' , 
                audioUID: '',
                oldAudioUID: this.item.audioUID
            }

            // Submits form
            var failedWithCloudExit;

            await Cloud['updateGlossaryAudio'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
                this.formMessage = "Errore durante la rimozione dell'audio";          
            }

            this.syncing = false;

            // Data update was successful
            if (!failedWithCloudExit) {

                this.item.audio = "";
                this.item.audioUID = "";
                this.mode = 'view';          

            }

        },

        /**
         * Submits form data         
         */
        submit: async function() {        

            // the field is required
            if ( _.isUndefined(this.$refs.file.files[0]) ) {

                $( "#audio" ).addClass('is-invalid');
                this.formMessage = 'Campo obbligatorio';
                return;
                
            }
            
            // validate field 
            if ( this.validate( this.$refs.file.files[0] ) === false ) {

                $( "#audio" ).addClass('is-invalid');
                this.formMessage = 'Estensione o dimensione file non valida';
                return;

            }

            this.syncing = true;

            var data = { 
                id: this.item.id ,
                audio: this.$refs.file.files[0].name,
                audioFile: this.$refs.file.files[0],
                oldAudioUID: this.item.audioUID,
            };

            // Submit the form
            var failedWithCloudExit;

            var result =await Cloud['updateGlossaryAudio'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
                this.formMessage = "Errore durante l'aggiornamento del file";          
            }            

            // Data update was successful
            if (!failedWithCloudExit) {              

                this.item.audio = result.audio;
                this.item.audioUID = result.audioUID;
                this.audioSrc = '/glossario/' + this.item.audioUID;
                this.mode = 'view';

            }

            this.syncing = false;
            
        },
        
        /**
         * Validates file extension and size
         * 
         * @param {object} fileObj the selected file
         * @returns boolean
         */
        validate: function(fileObj) {                    
            
            var result = false;
            var allowedExts = ['mp3'];
            var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();
            var size = fileObj.size;
            
            allowedExts.forEach(elm => {
                
                if (extension == elm) {
                    
                    result = true;
                    return;
                    
                }
                
            });
            
            if ( size > 1048576) result = false;
            
            return result;               

        },

    }

});