/*
 * Action view-list
 *
 * @description :: Action for handling the categories homepage
 * 
 */

module.exports = {
    

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/category/view-list'
        },

        fail: {
            description: "when query fails",
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function () {        

        let pageTitle = "Categorie"; // page title
        let flash = ''; // message to be displayed on the page when session.flash is not empty
        
        var items = []; // categories. The order of categories follows the parent-child relationship         
        let parentCategories = []; // parent categories
        
        // Firstly, gets parent categories
        try {

            parentCategories = await Category.find( { 
                where: { parent_id: null },
                sort: 'id ASC' 
            });

        }
        catch (err) {

            throw { fail: { 
                pageTitle: pageTitle , 
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella category" } 
            } };

        }

        // Then, iterates through parent categories and gets their children, if any.
        if ( parentCategories.length > 0 ) {

            for (const element of parentCategories) {

                // Adds parent category to items array
                items.push(element);

                try {

                    var childrenCategories = await Category.find( {
                        where: { parent_id: element.id },
                        sort: 'id ASC'
                    });

                }
                catch (err) {

                    var childrenCategories = [];

                } 
                
                if ( childrenCategories.length > 0 ) {

                    // Adds children next to their parent category
                    childrenCategories.forEach( child => {

                        items.push(child);

                    });

                }

            }

        }
                    
        if ( _.isUndefined( this.req.session.flash ) === false ) {

            flash = { 
                type: this.req.session.flash.type, 
                message: this.req.session.flash.message 
            };

            // Deletes session flash. Avoids endless loop
            delete this.req.session.flash;

        }

        return { items: items , pageTitle: pageTitle , flash: flash };

    }

}