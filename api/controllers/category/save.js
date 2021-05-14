/*
 * Action save
 *
 * @description :: Action for handling the update and creation of a category
 * 
 */

module.exports = {

    inputs: {

        name: {
            type: 'string',
            require: true       
        },
        description: {
            type: 'string',
            required: true
        },
        parent_id: {
            type: 'ref'
        },
        id: {
            type: 'number',
            allowNull: true
        }
    },

    exits: {

        nameFail: {
            description: 'validation field name failed',
            statusCode: 409
        },
        descriptionFail: {
            description: 'validation field description failed',
            statusCode: 409
        },
        parentIdFail: {
            description: 'validation field parent_id failed',
            statusCode: 409
        }

    },

    fn: async function({name, description, parent_id, id}) {

        // new values for query
        let valuesToSet = { name: name , description: description };

        if ( _.isUndefined(parent_id) === false ) {
            
            valuesToSet['parent_id'] = (parent_id == '' || parent_id == null) ? null : parseInt(parent_id);

        }

        if ( _.isUndefined(id) ) {

            await Category.create(valuesToSet)
                        .intercept( {name: 'UsageError'} , (err) => {

                            return 'nameFail';

                        } )
                        .intercept( {description: 'UsageError'} , (err) => {

                            return 'descriptionFail';
                            
                        })
                        .intercept( {parent_id: 'UsageError'} , (err) => {

                            return 'parentIdFail';

                        });

        }
        else {

            var result = await Category.update( {id: id} ).set(valuesToSet)
                                    .intercept( {name: 'UsageError'} , (err) => {

                                        return 'nameFail';

                                    } )
                                    .intercept( {description: 'UsageError'} , (err) => {

                                        return 'descriptionFail';
                                        
                                    })
                                    .intercept( {parent_id: 'UsageError'} , (err) => {

                                        return 'parentIdFail';

                                    });

            if ( _.isUndefined(result) ) {

                this.req.session.flash = {type: 'error' , message: 'Aggiornamento della categoria non riuscito'};

            }

        }
        
        this.req.session.flash = {type: 'success' , message: 'Dati categoria salvati correttamente'};
        
        /*
         * Redirects to the categories homepage.
         * Redirection is provided by the method submittedForm of parasails object see view-create.page.js
         */

    }

}