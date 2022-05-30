/*
 * Parasails for glossary forms
 *
 */

parasails.registerPage('view-create', {

    data: {
                
        syncing: false,
        formData: {
            files: [],
        },

        // For tracking client-side validation errors in our form
        formErrors: { /* … */ },

        // Form rules
        formRules: {
            name: { required: true , maxLength: 100},
            term: { required: true, maxLength: 200 },
            definition: { required: true },
            file_image: {
                custom: function(fileObj) {

                    var result = false;
                    var allowedExts = ['png' , 'jpg' , 'jpeg'];
                    var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();
                    var size = fileObj.size;
                    
                    allowedExts.forEach(elm => {
                        
                        if (extension == elm) {
                            
                            result = true;
                            return;
                            
                        }
                        
                    });

                    if ( size > 3245728) result = false;
                    
                    return result;

                }
            },
            file_audio: {
                custom: function(fileObj) {

                    var result = false;
                    var allowedExts = ['mp3'];
                    var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();
                    var size = fileObj.size;
                    
                    allowedExts.forEach(elm => {
                        
                        if (extension == elm) {
                            
                            result = true;
                            return;
                            
                        }
                        
                    });
                    
                    if ( size > 1048576) result = false;
                    
                    return result;

                }
            },
        },

        // Server error state for the form
        cloudError: '' ,
        saveFailError: '',
        
    },

    // Populates formData only in update mode.
    beforeMount: function () {
        
        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

            this.formData = window.SAILS_LOCALS['item'];      

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
        
        /**
         * Opens local resources. Triggers event click on the file field
         * 
         * @param {string} type audio | image
         */
        openResources(type){

            if (type == 'image') this.$refs.file_image.click();

            if (type == 'audio') this.$refs.file_audio.click();

        },
                
        /**
         * Sets the image field to show the name of the selected file
         * Adds the file object to the formData
         */
        setFileImage() {
            
            this.$set(this.formData, 'image' , this.$refs.file_image.files[0].name);
            this.$set(this.formData, 'file_image' , this.$refs.file_image.files[0]);

        },

        /**
         * Sets the audio field to show the name of the selected file
         * Adds the file object to the formData
         */
        setFileAudio() {
            
            this.$set(this.formData, 'audio' , this.$refs.file_audio.files[0].name);
            this.$set(this.formData, 'file_audio' , this.$refs.file_audio.files[0]);

        },
        
        parseForm: function () {
            return argins;
        },

        submittedForm: async function () { 
            
            this.syncing = true;            
            window.location = '/glossary/list';

        },

        submittedUpdateForm: async function() {
            
            this.syncing = true;            
            window.location = '/glossary/details/' + this.item.id;

        },

        rejectedForm (err) {
            this.saveFailError = "Errore durante il salvataggio dei dati";
        },

    }
});