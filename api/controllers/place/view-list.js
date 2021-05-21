/**
 * Action view-list
 * 
 * @description Action for handling the homepage of places
 */


module.exports = {
    

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/place/view-list'
        },

        fail: {
            description: "when query fails",
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function () {        

        let pageTitle = "Luoghi"; // page title
        let flash = ''; // message to be displayed on the page when session.flash is not empty
        
        var items = []; // places    
        
        try {

            items = await Place.find( {                 
                sort: 'id ASC' 
            });

        }
        catch (err) {

            throw { fail: { 
                pageTitle: pageTitle , 
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella place" } 
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