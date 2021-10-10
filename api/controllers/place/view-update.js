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

        let pageTitle = "Modifica contenuto";
        // Item for the form
        let item = {};
        // Provides options to the select box. Only child-categories will be available in the select box
        let categories = [];
        // Terms from glossary table
        let terms = [];
        
        try {

            categories = await Category.find({                
              //where: { id: { '>': 1 } }, // parent_id: { '!=' : null }, 
                sort: 'name ASC'
            });

            terms = await Glossary.find( {sort: 'name ASC'} );

        } 
        catch (err) {
            //
        }  

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

        return { item: item , pageTitle: pageTitle , categories: categories, terms: terms };

    }

};
