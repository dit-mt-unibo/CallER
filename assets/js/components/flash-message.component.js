/**
 * <flash-message>
 * -----------------------------------------------------------------------------
 * A message box to render message from server.
 *
 * @type {Component}
 * 
 * @event click: fade out the box 
 * -----------------------------------------------------------------------------
 */

 parasails.registerComponent('flashMessage', {

    props: [
        'message', 
        
        // error|success. Sets the box style
        'type'
    ],

    data: function () {
        return {
            //
        };
    },


    template: `
  <div id="flash-box" class="message-box" :class="[type == 'error' ? 'message-box-error' : 'message-box-success']" @click="fadeOut()">
    {{message}}
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

        fadeOut: function() {
            $( "#flash-box" ).fadeOut();
        }

    }
});
