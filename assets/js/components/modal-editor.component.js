/*
 * <modal-editor>
 * 
 * Shows an HTML editor in a Boostrap modal window
 * 
 * ---Events---
 * @event save: async save button action 
 */

parasails.registerComponent('modalEditor', {

    props: [],

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
          <div class="modal-header">
            <h5 class="modal-title" id="modalEditor">
              <slot name="header">Contenuto</slot>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <textarea id="editor"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>
            <button type="button" class="btn btn-primary" @click="save()">Salva</button>            
          </div>
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
        
        save: function() {
            
          
            
        }
  
    }

});