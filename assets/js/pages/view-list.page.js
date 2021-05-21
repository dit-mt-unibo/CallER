/*
 * Parasails for view-list pages
 *
 */

parasails.registerPage('view-list', {
    
    data:  {
        
        // an array object of items extracted from database
        items: [],

        // selected item
        item: {},

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',
        
        // Id of the item to delete
        deleteItemId: '',

        // Trumbowyg modal editor
        syncing: false,
        formMessage: '',
        required: true,
        
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
        
        openModalEditor(item, field) {

            this.item = item;
            $( "#editor" ).trumbowyg('html' , item[field]);
            $( "#modalEditor" ).modal('show');      

        },
        
        setDeleteItemId(id) {            
            this.deleteItemId = id;
        },

        async publishCategory(item) {

            this.flashMessage = '';
            var value = (item.published == 0) ? 1 : 0;
            var data = { id: item.id , published: value };

            // Submit the form
            var failedWithCloudExit;

            await Cloud['publishCategory'].with(data)                                 
                    .tolerate((err) => {                  
                    failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "flashMessage"
            if (failedWithCloudExit) {
                this.flashMessage = { type: 'error' , message: 'Errore durante la modifica' };
            }

            // Data update wa successful, sends a message to user
            if (!failedWithCloudExit) {
            
                item.published = value;
                let message = (value == 0) ? 'Pubblicazione categoria annullata' : 'Categoria pubblicata';
                this.flashMessage = { type: 'success' , message: message };                

            } 

        },

        async publishPlace(item) {

            this.flashMessage = '';
            var value = (item.published == 0) ? 1 : 0;
            var data = { id: item.id , published: value };

            // Submit the form
            var failedWithCloudExit;

            await Cloud['publishPlace'].with(data)                                 
                    .tolerate((err) => {                  
                    failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "flashMessage"
            if (failedWithCloudExit) {
                this.flashMessage = { type: 'error' , message: 'Errore durante la modifica' };
            }

            // Data update wa successful, sends a message to user
            if (!failedWithCloudExit) {
            
                item.published = value;
                let message = (value == 0) ? 'Pubblicazione contenuto annullato' : 'Contenuto pubblicato';
                this.flashMessage = { type: 'success' , message: message };                

            } 

        }

    }
});