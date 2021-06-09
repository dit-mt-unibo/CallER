/**
 * Action save
 * 
 * @description Saves form data
 * 
 */

module.exports = {

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
        }

    },

    fn: async function(inputs, exits) {

        inputs.name = cleanFieldName(inputs.name);

        if ( _.isUndefined(inputs.id) ) {

            try {

                await Glossary.create(inputs);

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

            this.req.session.flash = {type: 'success' , message: 'Dati salvati correttamente'};

        }
        else {            

            var result = null;
            console.log()

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