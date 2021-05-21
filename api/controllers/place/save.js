/**
 * Action save
 * 
 * @description save or update place
 */

const Place = require('../../models/Place');

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

        nameFail: {
            description: 'validation field name failed',
            statusCode: 409
        },
        introTextFail: {
            description: 'validation field intro_text failed',
            statusCode: 409
        },
        fullTextFail: {
            description: 'validation field full_text failed',
            statusCode: 409
        },
        imageFail: {
            description: 'validation field image failed',
            statusCode: 409
        },
        videoFail: {
            description: 'validation field video failed',
            statusCode: 409
        },
        videoBlockFail: {
            description: 'validation field video_block failed',
            statusCode: 409
        },
        audioFail: {
            description: 'validation field audio failed',
            statusCode: 409
        },
        audioBlockFail: {
            description: 'validation field audio_block failed',
            statusCode: 409
        },
        photoGalleryFail: {
            description: 'validation field photo_gallery failed',
            statusCode: 409
        },
        photoGalleryBlockFail: {
            description: 'validation field photo_gallery_block failed',
            statusCode: 409
        },
        tagsFail: {
            description: 'validation field tags failed',
            statusCode: 409
        },
        latFail: {
            description: 'validation field lat failed',
            statusCode: 409
        },
        longFail: {
            description: 'validation field long failed',
            statusCode: 409
        },
        publishedFail: {
            description: 'validation field published failed',
            statusCode: 409
        },
        categoryIdFail: {
            description: 'validation field category_id failed',
            statusCode: 409
        },
        uploadFail: {
            description: 'when upload failed',
            statusCode: 409
        },
        sizeFail: {
            description: 'when image is too large',
            statusCode: 409
        }        

    },

    fn: async function(inputs, exits) {
        
        if ( _.isUndefined(inputs.id) ) {
            
            this.req.file('image').upload({

                maxBytes: 1000000000000,
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/contenuti'),                
            },
            async function whenDone (err, uploadedFiles) {
                    
               if(err) return exits.uploadFail();  

               inputs.image = uploadedFiles[0].filename;
               inputs.imageUID = uploadedFiles[0].fd.replace(/^.*[\\\/]/, '');

               var result = await Place.create(inputs)               
                        .intercept( {name: 'UsageError'} , (err) => { return exits.nameFail(); } )
                        .intercept( {intro_text: 'UsageError'} , (err) => { return exits.introTextFail(); } )
                        .intercept( {full_text: 'UsageError'} , (err) => { return exits.fullTextFail(); } )
                        .intercept( {image: 'UsageError'} , (err) => { return exits.imageFail(); } )
                        .intercept( {imageUID: 'UsageError'} , (err) => { return exits.imageFail(); } )
                        .intercept( {video: 'UsageError'} , (err) => { return exits.videoFail(); } )
                        .intercept( {video_block: 'UsageError'} , (err) => { return exits.videoBlockFail(); } )
                        .intercept( {audio: 'UsageError'} , (err) => { return exits.audioFail(); } )
                        .intercept( {audio_block: 'UsageError'} , (err) => { return exits.audioBlockFail(); } )
                        .intercept( {photo_gallery: 'UsageError'} , (err) => { return exits.photoGalleryFail(); } )
                        .intercept( {photo_gallery_block: 'UsageError'} , (err) => { return exits.photoGalleryBlockFail(); } )
                        .intercept( {tags: 'UsageError'} , (err) => { return exits.tagsFail(); } )
                        .intercept( {lat: 'UsageError'} , (err) => { return exits.latFail(); } )
                        .intercept( {long: 'UsageError'} , (err) => { return exits.longFail(); } )
                        .intercept( {published: 'UsageError'} , (err) => { return exits.publishedFail(); } )
                        .intercept( {category_id: 'UsageError'} , (err) => { return exits.categoryIdFail(); } );

                if (result) {

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

        }
        
        this.req.session.flash = {type: 'success' , message: 'Dati luogo salvati correttamente'};        
        
        /*
         * Redirects to the places homepage.
         * Redirection is provided by the method submittedForm of parasails object see view-create.page.js
         */

    }

}