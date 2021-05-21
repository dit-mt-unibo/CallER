/**
 * Action full_text update from modal window
 */

module.exports = {

    inputs : {

        id: {
            description: 'Place ID',
            type: 'number',
            required: true
        },

        full_text: {
            description: 'new value of the field full_text',
            type: 'string',
            required: true
        }

    },

    exits: {

        success: {
            statusCode: 200
        },
        fullTextFail: {
            description: 'validation field full_text failed',
            statusCode: 409
        },
        fail: {
            description: 'something went wrong with the query',
            statusCode: 409
        }
    },

    fn: async function( {id, full_text} ) {

        var valuesToSet = { full_text: full_text};

        var result = await Place.updateOne( { id: id} ).set( valuesToSet )
                        .intercept( {full_text: 'UsageError'} , (err) => {

                            return 'fullTextFail';

                        });

        if (result) {
            
            return 'success';

        }
        else {
            
            return 'fail';

        }
    }
}