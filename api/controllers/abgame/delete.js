/**
 * Action delete
 *
 * @description Action for handling removal of a term
 */

//const Abgame = require("../../models/Abgame");

module.exports = {

    inputs: {

        id: {
            description: 'abgame ID',
            type: 'number',
            required: true
        }

    },

    exits: {

    },

    fn: async function(inputs) {

        var result = null;

        try {

          result = await Abgame.destroyOne(inputs.id);

        }
        catch(err) {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione Gioco non riuscita. Errore: ' + err.message};
          return this.res.redirect('/admin/abgame/list');

        }

        if (result) {

            this.req.session.flash = {type: 'success' , message: 'Gioco eliminato correttamente'};

            /*
            if ( result.imageUID ) {

                sails.hooks.filemanager.delete('assets/glossario' , result.imageUID);
                sails.hooks.filemanager.delete('.tmp/public/glossario' , result.imageUID);

            }
            */

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione Gioco non riuscita'};

        }

      return this.res.redirect('/admin/abgame/list');

    }
}
