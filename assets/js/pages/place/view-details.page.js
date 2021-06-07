/*
 * Parasails for place details
 *
 */

parasails.registerPage('view-details', {

    data: {

        // place
        item: '',

        // object {type: 'error|success' , message:'text message'}. Works in pair with flash-message.compontent.js
        flashMessage: '',

        // Youtube url for video preview
        youtubeSrc: '',
        
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

        }
        
    }
});
