/**
 * Parasails for user forms
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
            name: { required: true , maxLength: 200 },
            surname: { required: true , maxLength: 255 },
            username: { required: true , maxLength: 100 },
            password: { required: true },
            confirmPassword: { required: true, sameAs: 'password' },
        },

        // Server error state for the form
        cloudError: '' ,
        
    },

    // Populates formData only in update mode.
    // In update mode removes required rule for the fields password and confirmPassword
    beforeMount: function () {
        
        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

            this.formData = window.SAILS_LOCALS['item'];
            this.formRules['password'] = { };
            this.formRules['confirmPassword'] = { };

        } 

    },
    mounted: async function () {

    },

    methods: {
        
        parseForm: function () {            
            return argins;
        },
        submittedForm: async function () { 
            
            this.syncing = true;            
            window.location = '/admin/user/list';

        },
        rejectedForm (err) {
            //
        },

        activeConfirmPasswordCheck() {
            
            let value = $("#new-password").val();

            if ( value.length > 0 ) {

                this.formRules['confirmPassword'] = { required: true, sameAs: 'newPassword' };

            }
            else {

                this.formRules['confirmPassword'] = {};

            }

        }

    }
});