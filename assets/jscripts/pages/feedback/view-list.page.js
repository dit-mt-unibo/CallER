/**
 * Parasails for view-list page
 */

parasails.registerPage('view-list' , {

    data: {

        // an array object of feedbacks from database
        items: [],

        // feedbacks counters grouped by rating
        rates_count: [],

        // total feedbacks
        count_feedbacks: 0,

        // Filters items. Options select box stars and input place name
        filter_stars: '',
        filter_place: '',

    },

    computed: {

        // Filters items by place name or stars
        filteredItems () {

            let items =  this.items.filter(item => {

                let searchName = _.isUndefined(this.filter_place) ? "" : this.filter_place.toLowerCase();
                let searchstars = _.isUndefined(this.filter_stars) ? 0 : this.filter_stars;
                
                if ( searchName == "" && searchstars == 0 ) return item;

                if ( _.isEmpty(searchName) === false ) {

                    let name = item.place_id.name.toLowerCase();

                    if ( name.indexOf(searchName) > -1 ) {

                        if ( searchstars == 0 ) return item;

                        if ( item.rate == searchstars ) return item;

                    }
                }
                else {

                    if ( item.rate == searchstars ) return item;

                }

            });

            this.count_feedbacks = items.length;

            this.listStarsCalcTotalItems(items);

            return items;

        },

    },

    beforeMount: function() {

        this.items = window.SAILS_LOCALS['items'];        

    },

    methods: {

        /**
         * Sets property filter_stars
         * 
         * @param {string} value rating 1-5
         */
        filterByStars: function(value) {

            if ( this.filter_stars == value ) {

                this.filter_stars = 0;

            }
            else{

                this.filter_stars = value;

            }            

        },

        /**
         * Sets property rates_count
         * 
         * @param {Array} items array of Feedback objects
         */
        listStarsCalcTotalItems : function(items) {

            this.rates_count = [0, 0, 0, 0, 0];

            items.forEach(item => {
                
                switch(item.rate) {

                    case 5 :
                        this.rates_count[4]++;
                        break;

                    case 4:
                        this.rates_count[3]++;
                        break;

                    case 3:
                        this.rates_count[2]++;
                        break;

                    case 2:
                        this.rates_count[1]++;
                        break;

                    case 1:
                        this.rates_count[0]++;
                        break;

                    default:
                        break;
                }

            });

        }
        
    }

})