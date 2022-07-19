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
        description: {
            type: 'string',
            required: true
        },
        id: {
            type: 'number',
            allowNull: true
        },
        activeFrom: {
            type: 'string',
        },
        activeTo: {
            type: 'string',
        },

    },

    exits: {

        saveFail: {
            description: 'when save/update query fails',
            statusCode: 409
        },
        uniqueFail: {
            description: 'occurs when a hunt already exists',
            statusCode: 409
        },
        uploadFilesFail: {
            description: 'when upload fails',
            statusCode: 409
        },

    },

    fn: async function(inputs, exits) {

        if ( _.isUndefined(inputs.id) ) {

            try {

                await Hunt.create(inputs);

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

            var result = null;

            try {

                result = await Hunt.updateOne( {id: inputs.id} ).set(inputs);

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
