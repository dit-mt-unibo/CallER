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
        let items = []; // categories from database 
        let flash = ''; // message to be displayed on the page when session.flash is not empty
        
        try {

            items = await Category.find( { 
                sort: [ {id: 'ASC'} , {parent_id: 'ASC'} ]
            });

        }
        catch (err) {

            throw { fail: { 
                pageTitle: pageTitle , 
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella category" } 
            } };

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