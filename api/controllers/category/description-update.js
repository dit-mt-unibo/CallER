/*
 * Action description update from modal window
 *
 */

module.exports = {

    inputs : {

        id: {
            description: 'Category ID',
            type: 'number',
            required: true
        },

        description: {
            description: 'new value of the field description',
            type: 'string',
            required: true
        }

    },

    exits: {

        success: {
            statusCode: 200
        },
        descriptionFail: {
            description: 'validation field description failed',
            statusCode: 409
        },
        fail: {
            description: 'something went wrong with the query',
            statusCode: 409
        }
    },

    fn: async function( {id, description} ) {

        var valuesToSet = { id: id , description: description};

        var result = await Category.updateOne( valuesToSet )
                        .intercept( {description: 'UsageError'} , (err) => {

                            throw 'descriptionFail';

                        });

        if (result) {
            throw 'success';
        }
        else {
            throw 'fail';
        }
    }
}