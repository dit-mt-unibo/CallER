/**
 * Action save
 * 
 * @description save or update place
 */

 module.exports = {

    inputs: {

        name: {
            type: 'string',
            required: true
        },        
        intro_text: {
            type: 'string',
            allowNull: true
        },        
        full_text: {
            type: 'string',
            required: true            
        },
        video: {
            type: 'string',
            allowNull: true
        },
        video_block: {
            type: 'number',
            allowNull: true
        },        
        audio: {
            type: 'string',            
            allowNull: true
        },
        audio_block: {
            type: 'number',
            allowNull: true
        },        
        photo_gallery: {
            type: 'string',            
            allowNull: true
        },
        photo_gallery_block: {
            type: 'number',
            allowNull: true
        },        
        tags: {
            type: 'json'            
        },        
        lat: {
            type: 'number',
            allowNull: true            
        },
        long: {
          type: 'number',
          allowNull: true
        },        
        published: {
            type: 'number',
            allowNull: true
        },        
        category_id: {
            type: 'number',
            required: true
        },        
        id: {
            type: 'number',
            allowNull: true
        }
    },

    exits: {

        saveFail: {
            description: 'when save/update query fails',
            statusCode: 409
        },
        uploadFail: {
            description: 'when image upload fails',
            statusCode: 409
        }      

    },

    fn: async function(inputs, exits) {
        
        var session = this.req.session;

        if ( _.isEmpty(inputs.video) === false ) {

            inputs.video = youtubeEmbedUrl(inputs.video);

        }

        if ( _.isUndefined(inputs.id) ) {
            
            this.req.file('image').upload({

                maxBytes: 1000000000000,
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/contenuti'),                
            },
            async function whenDone (err, uploadedFiles) {
                    
               if(err) return exits.uploadFail();  

               inputs.image = uploadedFiles[0].filename;
               inputs.imageUID = uploadedFiles[0].fd.replace(/^.*[\\\/]/, '');                            

                try {
                    
                    var result = await Place.create(inputs)
                    .intercept( (err) => {                         
                        
                        return exits.saveFail();

                    } )                    
                    .fetch();

                }   
                catch(err) {
                    //
                }                                     

                if (result) {                  

                    session.flash = {type: 'success' , message: 'Dati luogo salvati correttamente'};
                    return exits.success(); 

                }                              
        
            });             

        }
        else {                        

            var result = await Place.update( {id: inputs.id} ).set(inputs)
                                    .intercept( {name: 'UsageError'} , (err) => {

                                        return 'nameFail';

                                    } );

            if ( _.isUndefined(result) ) {

                this.req.session.flash = {type: 'error' , message: 'Aggiornamento luogo non riuscito'};

            }

            this.req.session.flash = {type: 'success' , message: 'Dati luogo salvati correttamente'};
                
            return exits.success();  

        }              
        
        /*
         * Redirects to the places homepage.
         * Redirection is provided by the method submittedForm of parasails object see view-create.page.js
         */

    }    

}

/**
 * Returns embed url for youtube video
 * @param url value sent by user
 * @returns string
 */
function youtubeEmbedUrl(url) {

    var embedUrl = "https://www.youtube.com/embed/";    
    var youTubeVideoId = "";
    
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

        return embedUrl  + youTubeVideoId;        

    }       

    return "";

}