/**
 * Action image-update
 * 
 * @description updates/removes image
 */

 module.exports = {

    files: ['image'],

    inputs: {

        id: {
            type: 'number',
            required: true
        },
        oldImage: {
            type: 'string',
            allowNull: true
        },
        image_caption: {
            type: 'string',
            allowNull: true
        },
        image: {
            type: 'ref'
        }

    },

    exits: {

        saveFail: {
            description: 'when save/update query fails',
            statusCode: 409
        },
        uploadFileFail: {
            description: 'when upload fails',
            statusCode: 409
        },

    },

    fn: async function(inputs, exits){

        var imageUID = null;
        var imageSrc = null;

        var uploadedFile = await sails.uploadOne(inputs.image , {
            maxBytes: 4194304,
            dirname: require('path').resolve(sails.config.appPath , 'assets/glossario'),
        })
        .intercept('E_EXCEEDS_UPLOAD_LIMIT' , 'uploadFileFail')
        .intercept((err) => { console.log(err.message); });

        if ( _.isUndefined(uploadedFile) === false ) {

            if ( uploadedFile ) {

                imageUID = uploadedFile.fd.replace(/^.*[\\\/]/, '');
                imageSrc = uploadedFile.filename;
    
            }
            else {
    
                return exits.uploadFileFail();
    
            }

        }        

        var result = null;

        try{

            result = await Glossary.updateOne( {id: inputs.id} )
                                .set({
                                    image: imageSrc,
                                    imageUID: imageUID,
                                    image_caption: inputs.image_caption
                                });

        }
        catch(err) {

            console.log(err.message);
            return exits.saveFail();

        }

        // If query was successful, deletes old image file from server
        if ( result && inputs.oldImage ){

            sails.hooks.filemanager.delete('assets/glossario' , inputs.oldImage);
            sails.hooks.filemanager.delete('.tmp/public/glossario' , inputs.oldImage);

        }

        return exits.success( { image: imageSrc, imageUID: imageUID } );
    }
}