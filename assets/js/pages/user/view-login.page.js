/*
 * Parasails for user login forms
 *
 */

parasails.registerPage('view-login', {

    data: {
                
        syncing: false,
        formData: {
            /* ... */
        },

        // For tracking client-side validation errors in our form
        formErrors: { /* … */ },

        // Form rules
        formRules: {
            username: { required: true },
            password: { required: true },
        },

        // Server error state for the form
        cloudError: '' ,
        
    },

    methods: {
        
        parseForm: function () {            
            return argins;
        },
        submittedForm: async function () { 
            
            this.syncing = true;            
            window.location = '/admin';

        },
        rejectedForm (err) {
            //
        }

    }
});