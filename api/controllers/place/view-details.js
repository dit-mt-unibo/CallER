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
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        try {

            item = await Place.findOne({ id: id }).populate('feedbacks');            

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

            var catResults = await Category.findOne({ id: item.category_id });

            if ( _.isEmpty(catResults) == false ) {

                item.category = catResults.name;

            }

            item.quiz = await Quiz.findOne({ place_id: item.id });

        }

        if ( _.isUndefined( this.req.session.flash ) === false ) {

            flash = { 
                type: this.req.session.flash.type, 
                message: this.req.session.flash.message 
            };

            // Deletes session flash. Avoids endless loop
            delete this.req.session.flash;

        }

        return { item: item , pageTitle: pageTitle , flash: flash };

    }

};