/**
 * <modal-editor>
 * 
 * Shows an HTML editor in a Boostrap modal window
 * 
 * @type {Component}
 * 
 * @slot header
 * 
 * @event submit: form submit
 * @event save: save button click event
 * @event close: close modal
 * 
 */

parasails.registerComponent('modalEditor', {

    props: [
      
      'syncing',  //  2-way bound (:syncing.sync="")
      'required', // true | false
      'action', // form action
      'formMessage', //  2-way bound (:form-message.sync="")
      'item'
    
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
    <div class="modal fade" id="modalEditor" tabindex="-1" role="dialog" aria-labelledby="modalEditor" aria-hidden="true">
      <div class="modal-dialog" style="max-width:1300px;" role="document">
        <div class="modal-content">
          <form @submit.prevent="submit()">
            <div class="modal-header">
              <h5 class="modal-title" id="modalEditor">
                <slot name="header">Contenuto</slot>
              </h5>
              <flash-message v-if="formMessage" :message="formMessage.message" :type="formMessage.type"></flash-message>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <textarea id="editor"></textarea>
            </div>            
            <div class="modal-footer">                            
              <button @click="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>              
              <button @click="save()" type="submit" class="btn btn-success">
                <span class="button-text" v-if="!syncing">Salva</span>
                <span class="clearfix" v-if="syncing">Invio in corso...</span>
              </button> 
            </div>
          </form>
        </div>
      </div>
    </div>
    `,

    mounted: async function () {

      $( "#editor" ).trumbowyg({
          btns: [
              ['undo', 'redo'], // Only supported in Blink browsers
              ['strong', 'em'],
              ['link'],
              ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
              ['unorderedList', 'orderedList'],
              ['removeformat']
          ],
          removeformatPasted: true
      } );

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {
        
      save: async function() {
        
        $( ".trumbowyg-box" ).removeClass('tbw-is-invalid');
        this.$emit('update:formMessage', '');
        this.$emit('click');

      },

      close: function() {

        $( ".trumbowyg-box" ).removeClass('tbw-is-invalid');
        this.$emit('update:formMessage', '');

      },

      submit: async function() {        
        
        var tbwValue = $( "#editor" ).trumbowyg('html');

        // If the field is required, check the content of the field
        if ( this.required === true ) {

          if ( tbwValue.length == 0 ) {

            $( ".trumbowyg-box" ).addClass('tbw-is-invalid');
            this.$emit('update:formMessage', { type: 'error' , message: 'Campo obbligatorio' });
            return;

          }

        }

        var data = { id: this.item.id , description: tbwValue };

        // Set syncing state to `true` on userland "syncing" prop.
        this.$emit('update:syncing', true);

        // Submit the form
        var failedWithCloudExit;

        await Cloud[this.action].with(data)                                 
                .tolerate((err) => {                  
                  failedWithCloudExit = err.exit || 'error';
                });

        // When an error occurs, tolerate it, but set the userland "formMessage"
        if (failedWithCloudExit) {
          this.$emit('update:formMessage', { type: 'error' , message: 'Errore durante la modifica' });
        }

        // Set syncing state to `false` on userland "syncing" prop.
        this.$emit('update:syncing', false);

        // Data update wa successful, sends a message to user
        if (!failedWithCloudExit) {
          
          this.item.description = tbwValue;
          this.$emit('update:formMessage', { type: 'success' , message: 'Modifica salvata' });          

        } 
          
      }      
  
    }

});