/**
 * <flash-message>
 * 
 * A message box to render message from server.
 *
 * @type {Component}
 * 
 * @event click: fade out the box 
 * 
 */

 parasails.registerComponent('flashMessage', {

    props: [
        'message',                 
        'type' // error|success. Sets the style
    ],

    data: function () {
        return {
            //
        };
    },


    template: `
  <div id="flash-box" class="message-box" @click="fadeOut()">
    <div :class="[type == 'error' ? 'message-box-error' : 'message-box-success']">
        {{message}}
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

        fadeOut: function() {
            $( "#flash-box" ).fadeOut();
        }

    }
});
