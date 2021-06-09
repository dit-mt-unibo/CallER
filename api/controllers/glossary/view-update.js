/**
 * Action view-update
 * 
 * @description Form for editing a term
 * 
 */

module.exports = {

    inputs: {

        id: {            
            description: 'term ID',
            type: 'number',           
        }

    },

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/glossary/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {   

        let pageTitle = "Modifica vocabolo";
        // Item for the form
        let item = {}; 

        try {

            item = await Glossary.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare il vocabolo richiesto. Errore: " + err.message }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Vocabolo non trovato" , message: "Il vocabolo richiesto non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pageTitle };

    }

}