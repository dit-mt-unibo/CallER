/**
 * Action delete
 * 
 * @description Action for handling removal of a term
 */

module.exports = {

    inputs: {

        id: {
            description: 'term ID',
            type: 'number',
            required: true
        }

    },

    exits: {

    },

    fn: async function(inputs) {

        var result = null;

        try {
            
            result = await Glossary.destroyOne(inputs.id);

        }
        catch(err) {
                        
            this.req.session.flash = {type: 'error' , message: 'Eliminazione vocabolo non riuscita. Errore: ' + err.message};
            return this.res.redirect('/glossary/list');

        }   
        
        if (result) {

            this.req.session.flash = {type: 'success' , message: 'Vocabolo eliminato correttamente'};

            if ( result.imageUID ) {

                sails.hooks.filemanager.delete('assets/glossario' , result.imageUID);
                sails.hooks.filemanager.delete('.tmp/public/glossario' , result.imageUID);

            }

            if ( result.audioUID ) {

                sails.hooks.filemanager.delete('assets/glossario' , result.audioUID);
                sails.hooks.filemanager.delete('.tmp/public/glossario' , result.audioUID);

            }

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione vocabolo non riuscita'};

        }

        return this.res.redirect('/glossary/list');

    }
}