/**
 * Action delete
 *
 * @description Removes a stage from database and deletes its picture from .tmp and assets folders
 */

 module.exports = {

    inputs : {

        id: {
            description: 'Stage ID',
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

        var result = await Stage.destroyOne({ id: id })
                    .intercept( (err) => {

                        return {
                            sqlFail: {
                                error: {
                                    title: 'Errore database' ,
                                    message: 'La query di delete tappa ha prodotto un errore'
                                }
                            }
                        };

                    } );

        if ( result ) {

            // removes images

            sails.hooks.filemanager.delete('assets/images/contenuti' , result.imageUID);
            sails.hooks.filemanager.delete('assets/images/contenuti/thumbs' , result.imageUID);
            sails.hooks.filemanager.delete('.tmp/public/images/contenuti' , result.imageUID);
            sails.hooks.filemanager.delete('.tmp/public/images/contenuti/thumbs' , result.imageUID);

            this.req.session.flash = {type: 'success' , message: 'Dati eliminati correttamente'};

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione non riuscita'};

        }

        return this.res.redirect('/stage/list');

    }

}
