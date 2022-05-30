/**
 * <image-form>
 * 
 * Shows the preview of the image.
 * Allows to upload or delete a new image
 * 
 * @type {Component}
 * 
 * 
 * @event submit: form submit
 * @event save: save button click event
 * @event changeMode: switches between form mode and view mode
 * @event openResources: files browser
 * @event deleteImage: deletes image from server
 * 
 */

 parasails.registerComponent('imageForm', {

    props: {

      // show/hide button delete
      showBtnDelete : {
        type: Boolean,
        default: false
      },
      // form action attribute
      formAction : {
        type: String,
        default: ""
      },
      item : {
        type: Object,
        default: () => {}
      },
      // 
      baseImgPath: {
        type: String,
        default: '/images'
      },      

    },

    data: function () {
     
        return {
          
          // original image source
          imgSrc: "",
          // show/hide loader
          syncing: false,
          // form message
          formMessage: "",
          // view (shows image) || form (shows form)
          mode: 'view'

        };
  
      },
    
      beforeMount: function() {
        //
      },

    template: `
    <div class="card" style="width:50%">      
      <div v-if="mode == 'view'">        
        <img v-if="item.image" id="img" :src="imgSrc" width="100%" style="max-width:400px;">
        <p v-if="item.image_caption" class="mt-2">{{item.image_caption}}</p>                   
        <p v-if="!item.image" class="card-text" style="margin-top:20px;">Non hai ancora aggiunto un'immagine</p>                   
        <div class="card-body" align="center">
            <button type="button" v-if="!item.image" @click="changeMode('form')" class="btn btn-success col-2">Aggiungi</button>
            <button type="button" v-if="showBtnDelete && item.image" @click="deleteImage" class="btn btn-danger mr-2 col-2">Rimuovi</button>
            <button type="button" v-if="item.image" @click="changeMode('form')" class="btn btn-primary col-2">Modifica</button>
        </div>  
      </div>
      <div v-if="mode == 'form'" class="card-body">        
        <form id="form-image" @submit.prevent="submit()" enctype="multipart/form-data">          
          <div class="form-group col-11">
            <h5 align="left">Seleziona immagine</h5>                  
            <div class="input-group">                            
              <input type="text" name="fake-image"  class="form-control"
                  id="fake-image" readonly style="background-color: #FFF;">
              <button type="button" @click="openResources()" class="btn btn-outline-secondary">Sfoglia</button>                                
            </div>
            <p align="left" v-if="formMessage" class="text-danger">{{formMessage}}</p>
            <input type="file" style="display:none;" ref="file" name="image" v-on:change="setFakeImage()">
          </div>
          <div class="form-group col-11">
            <h5 align="left">Didascalia <span class="small">(opzionale)</span></h5>
            <textarea id="caption" name="image_caption" class="form-control" rows="3">{{item.image_caption}}</textarea>
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

      this.imgSrc = this.baseImgPath + "/" + this.item.imageUID;

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {
        
      save: async function() {
        
        $( "#fake-image" ).removeClass('is-invalid');
        this.formMessage = '';
        this.$emit('click');

      },

      changeMode: function(mode) {

        this.syncing = false;
        this.mode = mode;
        this.formMessage = '';        

      },

      // Opens local resources
      openResources() {
            
        this.$refs.file.click();

      },

      // Sets value of the field fake-image
      setFakeImage() {

        $( "#fake-image").val( this.$refs.file.files[0]["name"] );

      },

      deleteImage: async function() {

        this.syncing = true;

        var data = { 
          id: this.item.id ,
          image_caption: "",
          oldImage: this.item.imageUID
        }

        // Submit the form
        var failedWithCloudExit;

        await Cloud[this.formAction].with(data)                                 
                .tolerate((err) => {                  
                    failedWithCloudExit = err.exit || 'error';
                });

        // When an error occurs, tolerate it, but set the userland "formMessage"
        if (failedWithCloudExit) {
            this.formMessage = "Errore durante la rimozione dell'immagine";          
        }

        this.syncing = false;

        // Data update was successful
        if (!failedWithCloudExit) {

            this.item.image = "";
            this.item.imageUID = "";
            this.item.image_caption = "";
            this.mode = 'view';          

        }

      },

      submit: async function() {

        var caption = $( "#caption" ).val();
        var data = { id: this.item.id , image: '' , oldImage: '' , image_caption: caption };
        
        // validate image field only if not empty
        if ( _.isUndefined(this.$refs.file.files[0]) === false ){

          if ( this.validate(this.$refs.file.files[0]) === false ) {

            $( "#fake-image" ).addClass('is-invalid');
            this.formMessage = 'Estensione file non valida';
            return;
  
          }

          data.image = this.$refs.file.files[0];
          data.oldImage = this.item.imageUID;

        }        

        this.syncing = true;        

        // Submit the form
        var failedWithCloudExit;

        var result = await Cloud[this.formAction].with(data)                                 
                .tolerate((err) => {                  
                  failedWithCloudExit = err.exit || 'error';
                });

        // When an error occurs, tolerate it, but set the userland "formMessage"
        if (failedWithCloudExit) {
          this.formMessage = "Errore durante l'aggiornamento dell'immagine";          
        }        

        // Data update was successful
        if (!failedWithCloudExit) {
          
          // A new image was uploaded
          if ( _.isUndefined(result.image) === false ) {
            
            this.item.image = result.image;            
            this.item.imageUID = result.imageUID;
            this.imgSrc = this.baseImgPath + '/' + result.imageUID;

          }

          this.item.image_caption = caption;
          this.mode = 'view';          

        }

        this.syncing = false;
          
      },
      
      validate: function(fileObj) { 
        
        var result = false;
        var allowedExts = ['png' , 'jpg' , 'jpeg'];
        var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();
        
        allowedExts.forEach(elm => {
            
            if (extension == elm) {
                
                result = true;
                return;
                
            }
            
        });    
        
        return result;

      },      
  
    }

});