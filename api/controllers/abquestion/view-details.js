/**
 * Action view-update
 *
 * @description Shows full details of a abquestion
 */

//const abgame = require("../../models/abgame");

 module.exports = {

    inputs: {

        id: {
            description: 'abquestion ID',
            type: 'number',
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/abquestion/view-details'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        var pageTitle = "Coppia";
        // Item for the form
        let item = {};
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        try {

          item = await Abquestion.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare la Coppia richiesta" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Coppia non trovata" , message: "La Coppia richiesta non esiste nel database" }
            } };

        }
        else {

            pageTitle = item.name;

          var gameResults = await Abgame.findOne({ id: item.abgame_id });

            if ( _.isEmpty(gameResults) == false ) {

                item.abgame = gameResults.name;

            }

        }

        if ( _.isUndefined( this.req.session.flash ) === false ) {

            flash = {
                type: this.req.session.flash.type,
                message: this.req.session.flash.message
            };

            // Deletes session flash. Avoids endless loop
            delete this.req.session.flash;

        }

        return { item: item , pageTitle: pageTitle , flash: flash };

    }

};
