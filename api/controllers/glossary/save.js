/**
 * Action save
 * 
 * @description Saves form data
 * 
 */

module.exports = {

    files: ['files'],

    inputs: {

        name: {
            type: 'string',
            required: true
        },
        term: {
            type: 'string',
            required: true
        },
        definition: {
            type: 'string',
            required: true
        },
        id: {
            type: 'number',
            allowNull: true
        },
        image: {
            type: 'string',
            allowNull: true
        },
        image_caption: {
            type: 'string',
            allowNull: true
        },
        audio: {
            type: 'string',
            allowNull: true
        },
        files: {
            type: 'ref'
        }

    },

    exits: {
        
        saveFail: {
            description: 'when save/update query fails',
            statusCode: 409
        },
        uniqueFail: {
            description: 'occurs when a term already exists',
            statusCode: 409
        },
        uploadFilesFail: {
            description: 'when upload fails',
            statusCode: 409
        },

    },

    fn: async function(inputs, exits) {

        inputs.name = cleanFieldName(inputs.name);

        if ( _.isUndefined(inputs.id) ) {

            var uploadedFiles = await sails.upload(inputs.files , {
                maxBytes: 4194304,
                dirname: require('path').resolve(sails.config.appPath , 'assets/glossario'),
            })
            .intercept('E_EXCEEDS_UPLOAD_LIMIT' , 'uploadFilesFail')
            .intercept((err) => { console.log(err.message); });            
            
            if ( uploadedFiles ) {

                let optimizeImage = false;
    
                uploadedFiles.forEach(file => {
                    
                    if ( file.filename == inputs.audio ) {
    
                        inputs.audioUID = file.fd.replace(/^.*[\\\/]/, '');
    
                    }
    
                    if ( file.filename == inputs.image ) {
    
                        inputs.imageUID = file.fd.replace(/^.*[\\\/]/, '');
                        
                        optimizeImage = true;
    
                    }
    
                });

                if ( optimizeImage ) {

                    await sails.hooks.imageresize.optimize('assets/glossario' , inputs.imageUID);

                }                
    
            }
            else {
    
                return exits.uploadFilesFail();
    
            }
    
            try {
    
                await Glossary.create(inputs);
    
            }
            catch(err) {
    
                if ( err.code === 'E_UNIQUE' ) {
    
                    return exits.uniqueFail();
    
                }
                else {
    
                    console.log(err.message);
                    return exits.saveFail();
    
                }
    
            }
    
            this.req.session.flash = {type: 'success' , message: 'Dati salvati correttamente'};

        }
        else{

            inputs.files.noMoreFiles();

            var result = null;

            try {
                
                result = await Glossary.updateOne( {id: inputs.id} ).set(inputs);

            }
            catch(err) {                
                if ( err.code === 'E_UNIQUE') {

                    return exits.uniqueFail();

                }
                else {

                    console.log(err.message);
                    return exits.saveFail();

                }

            }

            if ( result ) {

                this.req.session.flash = {type: 'success' , message: 'Dati aggiornati correttamente'};

            }
            else {

                this.req.session.flash = {type: 'error' , message: 'Aggiornamento dati non riuscito'};

            }

        }   

        return exits.success();

    }
}

/**
 * Removes non-alphanumeric chars
 * @param value : input field name
 * @returns string
 */
function cleanFieldName(value) {
    return value.replace(/[^0-9a-zA-Z]/gi, '');
}