/*
 * Parasails for glossary forms
 *
 */

parasails.registerPage('view-create', {

    data: {
                
        syncing: false,
        formData: {
            /* ... */
        },

        // For tracking client-side validation errors in our form
        formErrors: { /* … */ },

        // Form rules
        formRules: {
            name: { required: true , maxLength: 100},
            term: { required: true, maxLength: 200 },
            definition: { required: true },
        },

        // Server error state for the form
        cloudError: '' ,
        saveFailError: '',
        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

            this.formData = window.SAILS_LOCALS['item'];      

        } 

    },
    mounted: async function () {
        
        $( "#tbweditor" ).trumbowyg({
            btns: [
                ['undo', 'redo'], // Only supported in Blink browsers
                ['strong', 'em'],
                ['link'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['removeformat'],
                ['fullscreen']
            ],
            removeformatPasted: true
        } );

    },

    methods: {
        
        parseForm: function () {            
            return argins;
        },
        submittedForm: async function () { 
            
            this.syncing = true;            
            window.location = '/glossary/list';

        },
        rejectedForm (err) {
            this.saveFailError = "Errore durante il salvataggio dei dati";
        },

    }
});