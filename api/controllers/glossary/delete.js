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

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione vocabolo non riuscita'};

        }

        return this.res.redirect('/glossary/list');

    }
}