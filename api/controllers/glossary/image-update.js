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
            dirname: require('path').resolve(sails.config.appPath , '.tmp/public/glossario'),
        })
        .intercept('E_EXCEEDS_UPLOAD_LIMIT' , 'uploadFileFail')
        .intercept((err) => { console.log(err.message); });

        if ( _.isUndefined(uploadedFile) === false ) {

            if ( uploadedFile ) {

                imageUID = uploadedFile.fd.replace(/^.*[\\\/]/, '');
                imageSrc = uploadedFile.filename;

                sails.hooks.filemanager.copy('.tmp/public/glossario' , 'assets/glossario' , imageUID);
    
            }
            else {
    
                return exits.uploadFileFail();
    
            }

        }        

        var result = null;
        var values = { image_caption: inputs.image_caption };

        if ( imageSrc != null ) values.image = imageSrc;

        if ( imageUID != null ) values.imageUID = imageUID;

        try{

            result = await Glossary.updateOne( {id: inputs.id} ).set( values );

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

        if ( imageUID == null ) return exits.success();

        return exits.success( { image: imageSrc, imageUID: imageUID } );
    }
}