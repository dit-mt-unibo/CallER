/**
 * <modal-delete>
 * 
 *  Bootstrap's modal component for delete button
 * 
 * @slot body
 * 
 */

parasails.registerComponent('modalDelete', {

    props: ['itemId' , 'action'],

    data: function () {
     
        return {
          //
        };
  
      },
    
      beforeMount: function() {
        //
      },

    template: `
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger">
                    <h5 class="modal-title text-white" id="confirmDeleteModal">Attenzione</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <slot name="body">
                    Vuoi eliminare questo contenuto?
                    </slot>                
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Annulla</button>
                    <button type="button" @click="click()" class="btn btn-danger" data-dismiss="modal">Elimina</button>
                </div>
            </div>
        </div>
    </div>
    `,

    mounted: async function () {

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {
  
        click: function() {            
            window.location = this.action + this.itemId;
        }

    }

});