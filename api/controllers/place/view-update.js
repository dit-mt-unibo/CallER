/**
 * Action view-update
 * 
 * @description Action for the "edit place" form
 */
 

 module.exports = {

    inputs: {

        id: {            
            description: 'place ID',
            type: 'number',           
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/place/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {        

        let pagetTitle = "Modifica luogo";
        // Item for the form
        let item = {};

        try {

            item = await Place.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare il luogo richiesto" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Luogo non trovato" , message: "Il luogo richiesto non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pagetTitle };

    }

};