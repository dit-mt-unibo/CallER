/*
 * Parasails for categories forms
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
            name: { required: true , maxLength: 150},
            description: { required: true },
            parent_id: { 
                required: false, 
                custom: function(value) {
                    
                    let parentID = parseInt(value);
                    return _.isNumber(parentID);

                }
            }
        },

        // Server error state for the form
        cloudError: '' ,

        // Category parent ID. Select box
        catParentId: '',
        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

            this.formData = window.SAILS_LOCALS['item'];
            this.catParentId = (this.formData.parent_id == null ) ? null : parseInt(this.formData.parent_id);            

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
            window.location = '/category/list';

        },
        rejectedForm (err) {
            //
        },
        selectOption () {            
            
            this.catParentId = this.$refs.catParentId.value;
            
        }

    }
});
