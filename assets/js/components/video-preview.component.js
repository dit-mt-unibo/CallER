/**
 * <video-preview>
 * 
 * A modal window for youtube video preview
 * 
 */

 parasails.registerComponent('videoPreview', {

    props: [
        'src',
    ],

    data: function () {
        return {
            //
        };
    },


    template: `
    <div class="modal fade" id="modalVideoPreview" tabindex="-1" role="dialog" aria-labelledby="modalVideoPreview" aria-hidden="true">
      <div class="modal-dialog" style="max-width:1300px;" role="document">
        <div class="modal-content">
          <form @submit.prevent="submit()">
            <div class="modal-header">
              <h5 class="modal-title" id="modalVideoPreview">Anteprima video</h5>              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <iframe width="560" height="315" :src="src" 
                    title="YouTube video player" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>              
            </div>            
            <div class="modal-footer">                            
              <button @click="close()" type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>              
            </div>
          </form>
        </div>
      </div>
    </div>
  `,

    beforeMount: function () {
        //
    },
    mounted: async function () {
        //
    },
    beforeDestroy: function () {
        //
    },
    methods: {

        close: function() {
    
        },

    },
    
});
