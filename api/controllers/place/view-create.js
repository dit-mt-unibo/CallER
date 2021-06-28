/**
 * Action view-create
 * 
 * @description Action for the "add new place" form
 */
 

 module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/place/view-create'
        }
    },

    fn: async function() {   

        // Provides options to the select box. Only child-categories will be available in the select box
        let categories = [];
        // Terms from glossary table
        let terms = [];
        
        try {

            categories = await Category.find({                
              where: { id: { '>': 1 } }, // parent_id: { '!=' : null }, 
                sort: 'name ASC'
            });

            terms = await Glossary.find( {sort: 'name ASC'} );

        } 
        catch (err) {
            //
        }    

        return { pageTitle: "Nuovo contenuto" , categories: categories , terms: terms };

    }

};
