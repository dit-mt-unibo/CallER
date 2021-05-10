/*
 * Action delete
 *
 * @description :: Action for handling removal of a single category
 * 
 */

module.exports = {

    inputs : {

        id: {
            description: 'Category ID',
            type: 'number',
            required: true
        }

    },

    exits: {
        //        
    },

    fn: async function({id}) {

        /*
         * Da definire. Deve eliminare tutte le sottocategorie e i contenuti?        
        */

        var result = await Category.destroyOne({ id: id});

        if ( result ) {

            this.req.session.flash = {type: 'success' , message: 'Categoria eliminata correttamente'};

        }
        else {

            this.req.session.flash = {type: 'error' , message: 'Eliminazione della categoria non riuscita'};

        }        

       this.res.redirect('/category');

    }

}