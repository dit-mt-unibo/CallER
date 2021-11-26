/*
 * Parasails for place details
 *
 */

parasails.registerPage('view-details', {

    data: {

        // place
        item: [],

        // feedbacks
        feedbacks: [],

        // feedbacks counters grouped by rate
        rates_count: [],

        // total feedbacks
        count_feedbacks: 0,

        // Filters feedbacks
        filter_stars: '',

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',

        // Youtube url for video preview
        youtubeSrc: '',
        
    },

    computed: {

        // Filters feedbacks
        filteredItems () {

            return this.feedbacks.filter(item => {
                
                let searchstars = _.isUndefined(this.filter_stars) ? 0 : this.filter_stars;
                
                if ( searchstars == 0 ) return item;

                if ( item.rate == searchstars ) return item;

            });

        },

    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        this.item = window.SAILS_LOCALS['item'];
        this.feedbacks = this.item.feedbacks;

        this.listStarsCalcTotalItems(this.feedbacks);

        if ( _.isUndefined(window.SAILS_LOCALS['flash']) == false ) {

            this.flashMessage = window.SAILS_LOCALS['flash'];

        }  
        
    },
    mounted: async function () {
    },

    methods: {        

        // Opens video preview modal
        videoPreview() {

            if ( $( "#video" ).val() != "" ) {

                var youTubeEmbedUrl = "https://www.youtube.com/embed/";
                var youTubeVideoId = "";
                const url = $ ( "#video" ).val();
                
                const pattern1 = /^https:\/\/youtu.be\//;
                const match1 = url.match(pattern1);

                if ( _.isNull(match1) === false) {

                    youTubeVideoId = url.split('/').slice(-1);

                }
                else {
                    
                    const pattern2 = /^https:\/\/www.youtube.com\/watch\?v=/;
                    const match2 = url.match(pattern2);

                    if ( _.isNull(match2) === false) {

                        tmpArray = url.split('=');
                        youTubeVideoId = tmpArray[1].split('&')[0];

                    }

                }

                if ( _.isEmpty(youTubeVideoId) === false ) {

                    this.youtubeSrc = youTubeEmbedUrl + youTubeVideoId;
                    $( "#modalVideoPreview" ).modal('show'); 

                }                

            }

        },

        filterByStars: function(value) {

            if ( this.filter_stars == value ) {

                this.filter_stars = 0;

            }
            else{

                this.filter_stars = value;

            }            

        },

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
});
