/**
 * Action view-update
 *
 * @description Action for the "edit stage" form
 */


 module.exports = {

    inputs: {

        id: {
            description: 'stage ID',
            type: 'number',
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/stage/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        let pageTitle = "Modifica Tappa";
        // Item for the form
        let item = {};
        // Provides options to the select box.
        let hunts = [];
        // Terms from glossary table
        let terms = [];

        try {

            hunts = await Hunt.find({
              //where: { id: { '>': 1 } }, // parent_id: { '!=' : null },
                sort: 'name ASC'
            });

            terms = await Glossary.find( {sort: 'name ASC'} );

        }
        catch (err) {
            //
        }

        try {

            item = await Stage.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare la tappa richiesto" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Tappa non trovata" , message: "La tappa richiesta non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pageTitle , hunts: hunts, terms: terms };

    }

};
