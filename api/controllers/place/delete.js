/**
 * Action delete
 * 
 * @description Removes a place from database and deletes its picture from .tmp and assets folders
 */

 module.exports = {

    inputs : {

        id: {
            description: 'Place ID',
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
        
        var result = await Place.destroyOne({ id: id })
                    .intercept( (err) => {
                            
                        return { 
                            sqlFail: { 
                                error: { 
                                    title: 'Errore database' , 
                                    message: 'La query di delete luogo ha prodotto un errore'
                                } 
                            } 
                        };

                    } );

        if ( result ) {

            // removes image
            const fs = require('fs');
            var filePath = require('path').resolve(sails.config.appPath, 'assets/images/contenuti') + '/' + result.imageUID;
            var filePathTmp = require('path').resolve(sails.config.appPath, '.tmp/public/images/contenuti') + '/' + result.imageUID;

            fs.unlink(filePath, function(err) {});
            fs.unlink(filePathTmp, function(err) { });

            this.req.session.flash = {type: 'success' , message: 'Luogo eliminato correttamente'};

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione luogo non riuscita'};

        } 
        
        return this.res.redirect('/place/list');

    }

}