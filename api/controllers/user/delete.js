/**
 * Action delete
 * 
 * @description Action for handling removal of a user
 */

module.exports = {

    inputs : {

        id: {
            description: 'User ID',
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

    fn: async function( { id } ) {        

        // User may not delete himself
        if ( id == this.req.session.userId ) {

            this.req.session.flash = {type: 'error' , message: 'Non puoi eliminare il tuo utente'};

        }
        else {

            var result = await User.destroyOne({ id: id })
                    .intercept( (err) => {
                            
                        return { 
                            sqlFail: { 
                                error: { 
                                    title: 'Errore database' , 
                                    message: 'La query di delete utente ha prodotto un errore'
                                } 
                            } 
                        };

                    } );

            if ( result ) {

                this.req.session.flash = {type: 'success' , message: 'Utente eliminato correttamente'};

            }
            else {

                this.req.session.flash = {type: 'error' , message: 'Eliminazione utente non riuscita'};

            }

        }        

        return this.res.redirect('/user/list');

    }

}