/**
 * Action view-update
 *
 * @description Form for editing a abgame
 *
 */

//const Abgame = require("../../models/Abgame");

module.exports = {

    inputs: {

        id: {
        description: 'abgame ID',
            type: 'number',
        }

    },

    exits: {

        success: {
            responseType: 'view',
        viewTemplatePath: 'pages/abgame/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        let pageTitle = "Modifica Gioco";
        // Item for the form
        let item = {};

        try {

          item = await Abgame.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare il Gioco richiesto. Errore: " + err.message }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Gioco non trovato" , message: "Il Gioco richiesto non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pageTitle };

    }

}
