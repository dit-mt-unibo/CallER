/**
 * Action delete
 *
 * @description Action for handling removal of a term
 */

module.exports = {

    inputs: {

        id: {
            description: 'hunt ID',
            type: 'number',
            required: true
        }

    },

    exits: {

    },

    fn: async function(inputs) {

        var result = null;

        try {

            result = await Hunt.destroyOne(inputs.id);

        }
        catch(err) {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione caccia al tesoro non riuscita. Errore: ' + err.message};
            return this.res.redirect('/admin/hunt/list');

        }

        if (result) {

            this.req.session.flash = {type: 'success' , message: 'Caccia al tesoro eliminata correttamente'};

            /*
            if ( result.imageUID ) {

                sails.hooks.filemanager.delete('assets/glossario' , result.imageUID);
                sails.hooks.filemanager.delete('.tmp/public/glossario' , result.imageUID);

            }
            */

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione Caccia al tesoro non riuscita'};

        }

        return this.res.redirect('/admin/hunt/list');

    }
}
