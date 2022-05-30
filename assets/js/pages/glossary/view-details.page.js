/*
 * Parasails for glossary details
 *
 */

parasails.registerPage('view-details', {

    data: {

        // glossary term
        item: [],

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',

        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        this.item = window.SAILS_LOCALS['item'];        

        if ( _.isUndefined(window.SAILS_LOCALS['flash']) == false ) {

            this.flashMessage = window.SAILS_LOCALS['flash'];

        }  
        
    },
    
});
