/**
 * Action view-update
 *
 * @description Shows full details of a hunt
 */

 module.exports = {

    inputs: {

        id: {
            description: 'hunt ID',
            type: 'number',
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/hunt/view-details'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {

        var pageTitle = "Caccia al tesoro";
        // Item for the form
        let item = {};
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        try {

            item = await Hunt.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare la caccia richiesta" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pageTitle ,
                error: { title: "Caccia al tesoro non trovata" , message: "La Caccia al tesoro richiesta non esiste nel database" }
            } };

        }
        else {

            pageTitle = item.name;

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
