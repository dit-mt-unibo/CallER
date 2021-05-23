/**
 * <video-form>
 * 
 * Mainly shows a preview of a youtube videoe.
 * By button "Modifica" shows a form to update the link
 * 
 * @type {Component}
 * 
 * 
 * @event submit: form submit
 * @event save: save button click event
 * @event changeMode: switches between form mode and view mode
 * @event openResources: files browser
 * 
 */

 parasails.registerComponent('videoForm', {

    props: [
      
      'syncing',      
      'formMessage',
      'item',
      'mode', // view (shows video preview) || form (shows form)
      'videoSrc',  
    
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
        <p v-if="!item.video" class="card-text" style="margin-top:20px;">
            Non hai ancora aggiunto un video
        </p>
        <iframe v-if="item.video" width="560" height="315" :src="item.video" 
            title="YouTube video player" frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <div style="margin:10px 0 20px 0;">
            <button type="button" v-if="!item.video" @click="changeMode('form')" class="btn btn-success">Aggiungi</button>
            <button type="button" v-if="item.video" @click="changeMode('form')" class="btn btn-primary">Modifica</button>
        </div>
      </div>
      <div v-if="mode == 'form'" class="card-body">        
        <form id="form-image" @submit.prevent="submit()">          
          <div class="form-group col-11">
            <h5 align="left">Inserisci link al video</h5>                  
            <div class="input-group">
                <input type="text" name="video" class="form-control" id="video" 
                    placeholder="url video es: https://www.youtube.com/embed/xxxx" autocomplete="off" />
                <button type="button" @click="openPreview()" class="btn btn-outline-secondary">Anteprima</button>              
            </div>
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

        openPreview: function() {

            this.$emit('preview');

        },
        
        save: async function() {
        
        $( "#video" ).removeClass('is-invalid');
        this.formMessage = '';
        this.$emit('click');

        },

        changeMode: function(mode) {

        this.syncing = false;
        this.mode = mode;
        this.formMessage = '';        

        },

        submit: async function() {        

            // the field is required
            if ( $( "#video").val() == '' ) {

                $( "#video" ).addClass('is-invalid');
                this.formMessage = 'Campo obbligatorio';
                return;
                
            }
            
            // validate field 
            if ( this.validate( $( "#video" ).val() ) === false ) {

                $( "#video" ).addClass('is-invalid');
                this.formMessage = 'Link youtube non valido';
                return;

            }

            this.syncing = true;

            var data = { id: this.item.id , video: $( "#video" ).val() }

            // Submit the form
            var failedWithCloudExit;

            var result =await Cloud['updateVideo'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
                this.formMessage = "Errore durante l'aggiornamento del link al video";          
            }

            this.syncing = false;

            // Data update was successful
            if (!failedWithCloudExit) {

                this.item.video = result.video;
                this.mode = 'view';          

            }
            
        },
        
        validate: function(link) {                    
            
            const pattern1 = /^https:\/\/youtu.be\//;
            const pattern2 = /^https:\/\/www.youtube.com\/watch\?v=/;                    

            const match1 = link.match(pattern1);
            const match2 = link.match(pattern2);

            return ( _.isNull(match1) === false || _.isNull(match2) == false );                

        },              

  
    }

});