/*
 * Action view-update
 *
 * @description :: Action for the "update category" form
 * 
 */

module.exports = {

    inputs: {

        id: {            
            description: 'category ID',
            type: 'number',           
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/category/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {        

        let pagetTitle = "Modifica categoria";
        // Items for the form
        let item = {};
        // Provides options to the select box. Only main categories will be available in the select box
        let categories = [];

        try {

            item = await Category.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare la categoria richiesta" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Categoria non trovata" , message: "La categoria richiesta non esiste nel database" }
            } };

        }

        try {

            categories = await Category.find({
                where: { parent_id: null } ,
                sort: 'name ASC'
            });

        } 
        catch (err) {
            //
        }   

        return { item: item , pageTitle: pagetTitle , categories: categories };

    }

}