/**
 * Action definition-update
 * 
 * @description Updates the field definition
 * 
 */

module.exports = {

    inputs: {

        id: {
            description: 'term ID',
            type: 'number',
            required: true
        },
        definition: {
            description: 'definition field',
            type: 'string',
            required: true
        }

    },
    
    exits: {

        success: {
            statusCode: 200
        },
        fail: {
            description: 'something went wrong with the query',
            statusCode: 409
        }
    },

    fn: async function( {id, definition} ){

        try {

            await Glossary.updateOne( {id: id} ).set( {definition: definition} )

        }
        catch(err) {
            console.log(err.message);
            throw { fail : err.message };

        }

        return 'success';

    }
}