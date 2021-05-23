/*
 * Parasails for place details
 *
 */

parasails.registerPage('view-details', {

    data: {

        // place
        item: '',

        // Category ID. Select box
        categoryId: '',

        // Place status published/unpublished
        published: '',

        // Youtube url for video preview
        youtubeSrc: '',

        // Array tags
        arrayTags: [],
        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        this.item = window.SAILS_LOCALS['item'];   
        
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

        // Sets category ID
        selectOption () {            
            
            this.categoryId = this.$refs.categoryId.value;
            
        },

        // Sets published status
        setPublishedStatus(value) {
                        
            this.published = value;
            this.formData.published = value;

        },

        // Adds a new tag
        addTag() {
            
            if ( this.$refs.newTag.value == "" ) return;
                        
            this.formData.tags.push(this.$refs.newTag.value);            
            this.$refs.newTag.value = "";

            this.arrayTags = this.formData.tags;

        },

        // removes tag
        removeTag(value) {
            
            var arrayTmp = this.formData.tags;

            this.formData.tags.forEach( function (elm, id) {
                
                if ( elm == value ) {

                    arrayTmp.splice(id, 1);

                }

            });

            this.formData.tags = arrayTmp;
            this.arrayTags = this.formData.tags;

        },

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
