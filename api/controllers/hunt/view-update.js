/**
 * Action view-update
 *
 * @description Form for editing a hunt
 *
 */

module.exports = {

    inputs: {

        id: {
            description: 'hunt ID',
            type: 'number',
        }

    },

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/hunt/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        let pageTitle = "Modifica Caccia al tesoro";
        // Item for the form
        let item = {};

        try {

            item = await Hunt.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare la Caccia al tesoro richiesta. Errore: " + err.message }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Caccia al tesoro non trovato" , message: "La Caccia al tesoro richiesta non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pageTitle };

    }

}
