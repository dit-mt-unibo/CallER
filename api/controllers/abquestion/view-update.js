/**
 * Action view-update
 *
 * @description Action for the "edit abquestion" form
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
            viewTemplatePath: 'pages/abquestion/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        let pageTitle = "Modifica Coppia";
        // Item for the form
        let item = {};
        // Provides options to the select box.
        let abgames = [];
        
        try {

          abgames = await Abgame.find({
              //where: { id: { '>': 1 } }, // parent_id: { '!=' : null },
                sort: 'name ASC'
            });

          
        }
        catch (err) {
          throw { fail : {
            pageTitle: pageTitle ,
            error: { title: "Errore database" , message: "Impossibile leggere elenco Giochi" }
        } };
        }

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

      return { item: item, pageTitle: pageTitle, abgames: abgames };

    }

};
