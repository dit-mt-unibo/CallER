/*
 * Action delete
 *
 * @description :: Action for handling removal of a single category
 * 
 */

module.exports = {

    inputs : {

        id: {
            description: 'Category ID',
            type: 'number',
            required: true
        }

    },

    exits: {

        sqlFail: {
            description: 'when a query fails',
            responseType: 'view',
            viewTemplatePath: 'pages/error.ejs'
        }

    },

    fn: async function({id}) {        

        // User can not remove Default category
        if (id == 1) {

            this.req.session.flash = {type: 'error' , message: 'La categoria Default non può essere eliminata'};

        }
        else {            

            /*
             * Before deleting the category:
             * sets field parent_id of children categories to 'Default'
             * sets field category_id of associated places to 'Default'
             */            
            await Category.update({ parent_id: id }).set( { parent_id: 1 } )
                .intercept( (err) => {
                    
                    return { 
                        sqlFail: { 
                            error: { 
                                title: 'Errore database' , 
                                message: 'La query di delete ha prodotto un errore. La categoria non è stata eliminata'
                            } 
                        } 
                    };

                } );

            await Place.update({ category_id: id }).set( { category_id: 1 } )
                .intercept( (err) => {
                    
                    return { 
                        sqlFail: { 
                            error: { 
                                title: 'Errore database' , 
                                message: 'La query di delete ha prodotto un errore. La categoria non è stata eliminata'
                            } 
                        } 
                    };

                } );        

            var result = await Category.destroyOne({ id: id })
                    .intercept( (err) => {
                            
                        return { 
                            sqlFail: { 
                                error: { 
                                    title: 'Errore database' , 
                                    message: 'La query di delete della categoria ha prodotto un errore'
                                } 
                            } 
                        };

                    } );

            if ( result ) {

                this.req.session.flash = {type: 'success' , message: 'Categoria eliminata correttamente'};

            }
            else {

                this.req.session.flash = {type: 'error' , message: 'Eliminazione della categoria non riuscita'};

            }

        }        

       return this.res.redirect('/category/list');

    }

}