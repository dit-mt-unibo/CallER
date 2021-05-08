/*
 * Parasails for view-list page
 *
 */

parasails.registerPage('view-list', {

    /*
     * items: an array object from database query
     * flashMessage: object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
     */
    data:  {
        
        // an array object from database query
        items: [],

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',

        // show modal box
        showModalBox: false,
        textModalBox: '',
        showModalBoxDelete: false,
        selectedItemId: '',
        
    },

    beforeMount: function () {
        
        this.items = window.SAILS_LOCALS['items'];

        if ( _.isUndefined(window.SAILS_LOCALS['flash']) == false ) {

            this.flashMessage = window.SAILS_LOCALS['flash'];

        }        

    },
    mounted: async function () {
        // ..
    },

    methods: {
        
        openModalBox(text) {
            this.showModalBox = true;
            this.textModalBox = text;
        },
        openModalBoxDelete(id){
            this.showModalBoxDelete = true;
            this.selectedItemId = id;
        },

        closeModalBox () {
            this.showModalBox = false;
        },
        closeModalBoxDelete () {
            this.showModalBoxDelete = false;
        },
        
        deleteCategory () {
            window.location = '/category/delete/' + this.selectedItemId;
        }


    }
});