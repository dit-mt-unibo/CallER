/*
 * Parasails for stage details -- TODO: this is not needed, probably, we have no star/feedback to filter.
 *
 */

parasails.registerPage('view-details', {

    data: {

        // stage
        item: [],

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',
    },

    computed: {

        // Filters feedbacks
        filteredItems () {
            return item;
        },

    },

    // Populates formData only in update mode.
    beforeMount: function () {

        this.item = window.SAILS_LOCALS['item'];

        if ( _.isUndefined(window.SAILS_LOCALS['flash']) == false ) {

            this.flashMessage = window.SAILS_LOCALS['flash'];

        }

    },
    mounted: async function () {
    },

    methods: {



    }
});
