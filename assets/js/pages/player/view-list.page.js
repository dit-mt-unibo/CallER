/**
 * Parasails for view-list page
 */

parasails.registerPage('view-list' , {

    data: {

        // an array object of players from database
        items: [],

        // Filters items by hunt id
        filter_hunt: '',

    },

    computed: {

        // Filters items by hunt id
        filteredItems () {

            let items =  this.items.filter(item => {

                let searchId = _.isUndefined(this.filter_hunt) ? "" : this.filter_hunt.toLowerCase();

                if ( searchId == "" ) return item;

                if ( _.isEmpty(searchId) === false ) {

                    if ( item.hunt_id == searchId)  {
                        return item;
                    }
                }

            });

            return items;

        },

    },

    beforeMount: function() {

        this.items = window.SAILS_LOCALS['items'];

    },

    methods: {


    }

})
