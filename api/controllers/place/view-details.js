/**
 * Action view-update
 * 
 * @description Shows full details of a place
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
            viewTemplatePath: 'pages/place/view-details'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {        

        var pageTitle = "Contenuto";
        // Item for the form
        let item = {};

        try {

            item = await Place.findOne({ id: id });            

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare il contenuto richiesto" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Contenuto non trovato" , message: "Il contenuto richiesto non esiste nel database" }
            } };

        }
        else {

            pageTitle = item.name;

            var catResults = await Category.findOne({ id: item.category_id});

            if ( _.isEmpty(catResults) == false ) {

                item.category = catResults.name;

            }

        }

        return { item: item , pageTitle: pageTitle};

    }

};