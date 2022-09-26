/**
 * Action delete
 *
 * @description Removes a stage from database and deletes its picture from .tmp and assets folders
 */

//import Stage from "../../models/Stage";

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

        // get position of stage to delete:
        var toDelete = await Stage.findOne({id:id});
        var positionDeleted = toDelete.position;
        sails.log("position %d will disappear from hunt %d", positionDeleted, toDelete.hunt_id);
        var hunt_id = toDelete.hunt_id;
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

            // change position (index) of all stages AFTER this one
            var stagesToUpdate = await Stage.find({
              where: { hunt_id: hunt_id, position: { '>': positionDeleted  } },
              sort: 'position ASC'
            });
            for(const stage of stagesToUpdate)
            {
              sails.log("changing position of stage %d to %d",stage.id, stage.position+1);
              await Stage.updateOne( {id: stage.id} ).set({position: stage.position - 1});
            }

            this.req.session.flash = {type: 'success' , message: 'Dati eliminati correttamente'};

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione non riuscita'};

        }

        return this.res.redirect('/stage/list');

    }

}
