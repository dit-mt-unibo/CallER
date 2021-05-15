/**
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

        var result = await Category.updateOne( { id: id } ).set( { published: published} )
                        .intercept( {published: 'UsageError'} , (err) => {

                            return 'publishedFail';

                        });

        if (result) {
            
            return 'success';

        }
        else {
            
            return 'fail';

        }
    }
}