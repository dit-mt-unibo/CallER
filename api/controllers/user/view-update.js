/**
 * Action view-update
 * 
 * @description Action for the "edit user" form
 */
 

 module.exports = {

    inputs: {

        id: {            
            description: 'user ID',
            type: 'number',           
        }

    },

    exits: {

        success: {
            returnType: 'view',
            viewTemplatePath: 'pages/user/view-update'
        },
        fail: {
            description: 'when query fails or return an empty result',
            returnType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function( {id} ) {        

        let pagetTitle = "Modifica utente";
        // Item for the form
        let item = {};

        try {

            item = await User.findOne({ id: id });

        }
        catch (err) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Errore database" , message: "Impossibile trovare l\'utente richiesto" }
            } };

        }

        if ( _.isEmpty(item) ) {

            throw { fail : {
                pageTitle: pagetTitle ,
                error: { title: "Utente non trovato" , message: "L\'utente richiesto non esiste nel database" }
            } };

        }

        return { item: item , pageTitle: pagetTitle };

    }

};