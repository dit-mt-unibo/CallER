/**
 * API per WebApp.
 * 
 * @description restituisce un json con i risultati dei places filtrati in base all'input inviato dall'utente
 */

module.exports = {

    fn: async function() {

        var result = { success: 0 , counter: 0 , items: [] };
        var items = [];
        
        if ( _.isUndefined(this.req.param('term')) ) return result;

        const sanitizeHtml = require('sanitize-html');
        let term = sanitizeHtml(this.req.param('term') , {
            allowedTags: [],
            allowedAttributes: {},
        });

        if ( _.isEmpty(term) ) return result;

        try{

            const nameResults = await Place.find( { 
                where: { name:  { contains: term } } ,
                select: ['id' , 'name' , 'intro_text' , 'full_text'],
                sort: 'name ASC'
            } );

            var ids = [];

            if ( nameResults.length > 0 ) {

                nameResults.forEach(item => {
                    
                    items.push(item);
                    ids.push(item.id);

                });

            }

            const introTextResults = await Place.find( {                 
                where : { 
                    intro_text: { contains: term },
                    id: { '!=': ids }
                },
                select: ['id' , 'name' , 'intro_text' , 'full_text'],
                sort: 'name ASC'
            } );                        

            if ( introTextResults.length > 0 ) {

                introTextResults.forEach(item => {
                    items.push(item);
                });

            }

        }
        catch (err) {

            console.log(err.message);
            return result;

        }

        result['success'] = 1;

        if ( items.length > 0 ) {

            result['items'] = items;
            result['counter'] = items.length;

        }

        return result;

    }

}