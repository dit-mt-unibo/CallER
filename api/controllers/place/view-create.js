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

        // Provides options to the select box. Only main categories will be available in the select box
        let categories = [];
        
        try {

            categories = await Category.find({                
                where: { parent_id: { '!=' : null }, id: { '>' : 1} } ,
                sort: 'name ASC'
            });

        } 
        catch (err) {
            //
        }    

        return { pageTitle: "Nuovo luogo" , categories: categories };

    }

};