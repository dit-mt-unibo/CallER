/*
 * <modal-box>
 * 
 * --- SLOTS ---
 * @slot header
 * @slot body
 * @slot footer
 *  
 * Customizable modal box. Suitable for several use. Based on https://vuejs.org/v2/examples/modal.html
 * @css modal-box.css
 * 
 */

parasails.registerComponent('modalBox', {

    props: ['show', 'body' , 'header'],

    data: function () {
     
        return {
          //
        };
  
      },
    
      beforeMount: function() {
        //
      },

    template: `
    <div>
    <transition name="modal" v-if="show">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        {{ header }}
                        <slot name="header"></slot>
                    </div>

                    <div class="modal-body">
                        {{ body }}
                        <slot name="body"></slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer"></slot>
                    </div>

                </div>
            </div>
        </div>
    </transition>
    </div>
    `,

    mounted: async function () {

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {
  
    }

});