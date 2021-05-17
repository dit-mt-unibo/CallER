/*
 * Parasails for view-list page
 *
 */

parasails.registerPage('view-list', {
    
    data:  {
        
        // an array object of items extracted from database
        items: [],

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',
        
        // Id of the item to delete
        deleteItemId: '',
        
    },

    beforeMount: function () {
        
        this.items = window.SAILS_LOCALS['items'];

        if ( _.isUndefined(window.SAILS_LOCALS['flash']) == false ) {

            this.flashMessage = window.SAILS_LOCALS['flash'];

        }        

    },
    mounted: async function () {
        //
    },

    methods: {
        
        setDeleteItemId(id) {            
            this.deleteItemId = id;
        },        

    }
});