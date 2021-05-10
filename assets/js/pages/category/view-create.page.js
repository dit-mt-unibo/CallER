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
                    
                    return value.match(/[0-9]{0,}/);

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

        } 

    },
    mounted: async function () {
        // ..
    },

    methods: {
        
        parseForm: function () {
            return argins;
        },
        submittedForm: async function () { 
            
            this.syncing = true;            
            window.location = '/category';

        },
        rejectedForm (err) {
            //
        },
        selectOption () {            
            
            this.catParentId = this.$refs.catParentId.value;
            
        }

    }
});