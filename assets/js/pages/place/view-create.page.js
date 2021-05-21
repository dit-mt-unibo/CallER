/*
 * Parasails for places forms
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
            full_text: { required: true },
            image: { 
                required: true ,
                custom: function(fileObj) {

                    var result = false;
                    var allowedExts = ['png' , 'jpg' , 'jpeg'];
                    var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();
                    
                    allowedExts.forEach(elm => {
                        
                        if (extension == elm) {
                            
                            result = true;
                            return;
                            
                        }
                        
                    });    
                    
                    return result;

                }
            },
            video: { 
                custom: function(value) {
                    
                    const pattern1 = /^https:\/\/youtu.be\//;
                    const pattern2 = /^https:\/\/www.youtube.com\/watch\?v=/;                    

                    const match1 = value.match(pattern1);
                    const match2 = value.match(pattern2);

                    return ( _.isNull(match1) === false || _.isNull(match2) == false );

                }
             },
            lat: {
                custom: function(value) {

                    const pattern = /^[1-9]{1}[0-9]{0,1}[.]{0,1}[0-9]{0,}$/;
                    const match = value.match(pattern);                    
                    
                    if ( _.isNull(match) ) return false;

                    return ( value >= -90 && value <= 90 );

                }
            } ,
            long: {

                custom: function(value) {

                    const pattern = /^[1-9]{1}[0-9]{0,2}[.]{0,1}[0-9]{0,}$/;
                    const match = value.match(pattern);
                    
                    if ( _.isNull(match) ) return false;                  

                    return ( value >= -180 && value <= 180 );

                }

            },      
            category_id: { 
                required: true, 
                custom: function(value) {
                    
                    let CatID = parseInt(value);
                    return _.isNumber(CatID);

                }
            }
        },

        // Server error state for the form
        cloudError: '' ,

        // Category ID. Select box
        categoryId: '',

        // Place status published/unpublished
        published: '',

        // Place image
        placeImg: '',

        // Youtube url for video preview
        youtubeSrc: '',

        // Array tags
        arrayTags: [],
        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

            this.formData = window.SAILS_LOCALS['item'];
            this.categoryId = (this.formData.category_id == null ) ? null : parseInt(this.formData.category_id);            

        }
        else {

            this.published = 1; 
            this.formData.tags = [];
            this.formData.published = 1;

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
            window.location = '/place/list';

        },
        rejectedForm (err) {
            //
        },

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

        // Opens local resources
        openResources() {
            
            this.$refs.file.click();

        },

        // Sets place image
        setPlaceImg() {

            this.placeImg = this.$refs.file.files[0];

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

                        youTubeVideoId = url.split('=').slice(-1);

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
