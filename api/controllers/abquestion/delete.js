/**
 * Action delete
 *
 * @description Removes a abquestion from database and deletes its picture from .tmp and assets folders
 */

//const abquestion = require("../../models/abquestion");

//import abquestion from "../../models/abquestion";

 module.exports = {

    inputs : {

        id: {
            description: 'abquestion ID',
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

      // get position of abquestion to delete:
      var toDelete = await Abquestion.findOne({ id: id });
        var positionDeleted = toDelete.position;
        sails.log("position %d will disappear from hunt %d", positionDeleted, toDelete.abquestion_id);
      var abquestion_id = toDelete.abquestion_id;
        var result = await Abquestion.destroyOne({ id: id })
                    .intercept( (err) => {

                        return {
                            sqlFail: {
                                error: {
                                    title: 'Errore database' ,
                                    message: 'La query di delete Coppia ha prodotto un errore'
                                }
                            }
                        };

                    } );

        if ( result ) {
            
            this.req.session.flash = {type: 'success' , message: 'Dati eliminati correttamente'};

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione non riuscita'};

        }

        return this.res.redirect('/admin/abquestion/list');

    }

}
