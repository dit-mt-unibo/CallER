/**
 * Action audio-update
 * 
 * @description updates audio file
 */

module.exports = {

    files: ['audioFile'],

    inputs: {

        id: {
            type: 'number',
            required: true
        },
        audio: {
            type: 'string',
            allowNull: true
        },
        oldAudioUID: {
            type: 'string',
            allowNull: true
        },
        audioFile: {
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

        var uploadedFile = await sails.uploadOne(inputs.audioFile , {
            maxBytes: 1048576,
            dirname: require('path').resolve(sails.config.appPath , '.tmp/public/glossario'),
        })
        .intercept('E_EXCEEDS_UPLOAD_LIMIT' , 'uploadFileFail')
        .intercept((err) => { console.log(err.message); });

        if ( _.isUndefined(uploadedFile) === false ){

            if ( uploadedFile ) {

                inputs.audioUID = uploadedFile.fd.replace(/^.*[\\\/]/, '');

                sails.hooks.filemanager.copy('.tmp/public/glossario' , 'assets/glossario' , inputs.audioUID);
    
            }
            else {
    
                return exits.uploadFileFail();
    
            }

        }        

        var result = null;

        try{

            result = await Glossary.updateOne( {id: inputs.id} )
                                .set({
                                    audio: inputs.audio,
                                    audioUID: inputs.audioUID
                                });

        }
        catch(err) {

            console.log(err.message);
            return exits.saveFail();

        }

        // If query was successful, deletes old audio file from server
        if ( result && inputs.oldAudioUID ){            

            sails.hooks.filemanager.delete('assets/glossario' , inputs.oldAudioUID);
            sails.hooks.filemanager.delete('.tmp/public/glossario' , inputs.oldAudioUID);

        }

        return exits.success( {audio: inputs.audio , audioUID: inputs.audioUID } );
    }
}