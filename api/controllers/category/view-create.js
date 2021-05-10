/*
 * Action view-create
 * 
 * @description :: Action for the "add category" form
 * 
 */

module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/category/view-create'
        }
    },

    fn: async function() {
        
        // Provides options to the select box. Only main categories will be available in the select box
        let categories = [];
        
        try {

            categories = await Category.find({                
                where: { parent_id: null } ,
                sort: 'name ASC'
            });

        } 
        catch (err) {
            //
        }        

        return { pageTitle: "Nuova categoria" , categories: categories };

    }

}