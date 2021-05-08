/*
 * Action publish
 *
 * @description :: Publish/unpublish a category.
 */

module.exports = {

    inputs : {

        id: {
            description: 'Category ID',
            type: 'number',
            required: true
        },

        published: {
            description: 'new value of the field published',
            type: 'number',
            required: true
        }

    },

    exits: {

        success: {
            statusCode: 200
        },
        publishedFail: {
            description: 'validation field published failed',
            statusCode: 409
        },
        fail: {
            description: 'something went wrong with the query',
            statusCode: 409
        }
    },

    fn: async function( {id, published} ) {

        var valuesToSet = { id: id , published: published};

        var result = await Category.updateOne( valuesToSet )
                        .intercept( {published: 'UsageError'} , (err) => {

                            throw 'publishedFail';

                        });

        if (result) {
            throw 'success';
        }
        else {
            throw 'fail';
        }
    }
}