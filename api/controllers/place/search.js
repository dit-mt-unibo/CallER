/**
 * API per WebApp.
 * 
 * @description restituisce un json con i risultati dei places filtrati in base all'input inviato dall'utente
 */

module.exports = {

    fn: async function() {

        /**
         * oggetto risposta json
         * success: 0|1 
         * counter: totale risultati trovati
         * items: risultati query
         */
        var result = { success: 0 , counter: 0 , items: [] };        
        
        // Risultati query find
        var items = [];
        
        if ( _.isUndefined(this.req.param('term')) ) return result;

        // Pulizia input utente
        const sanitizeHtml = require('sanitize-html');
        let term = sanitizeHtml(this.req.param('term') , {
            allowedTags: [],
            allowedAttributes: {},
        });

        if ( _.isEmpty(term) ) return result;

        try{

            /**
             * Le query sono tre in modo da avere i suggerimenti ordinati
             * prima per titolo, poi per testo introduttivo e infine per tag.             
             * 
             * Effettua la query cercando la stringa nella colonna name
             */
            const nameResults = await Place.find( { 
                where: { name:  { contains: term } } ,
                select: ['id' , 'name' , 'intro_text' , 'imageUID'],
                sort: 'name ASC'
            } );

            // Contiene gli id dei contenuti trovati.
            var ids = [];

            // Popola oggetto items
            if ( nameResults.length > 0 ) {

                nameResults.forEach(item => {
                    
                    items.push(item);
                    ids.push(item.id);

                });

            }

            /**
             * Effettua la query cercando la stringa nella colonna intro_text.
             * Esclude dai risultati gli ID dei contenuti già trovati con la query precedente.
             */
            const introTextResults = await Place.find( {                 
                where : { 
                    intro_text: { contains: term },
                    id: { '!=': ids }
                },
                select: ['id' , 'name' , 'intro_text' , 'imageUID'],
                sort: 'name ASC'
            } );                        

            // Popola oggetto items
            if ( introTextResults.length > 0 ) {

                introTextResults.forEach(item => {
                    
                    items.push(item);
                    ids.push(item.id);

                });

            }

            /**
             * Query per ricerca tra i tags.
             * Esclude dai risultati gli ID dei contenuti già trovati con le query precedenti.
             */
            const datastore = sails.getDatastore();

            var query = `
            SELECT id, name, intro_text, imageUID FROM place
            WHERE JSON_CONTAINS(tags , '"` + term + `"')
            `
            if ( ids.length > 0 ) {

                query += " AND id NOT IN (" + ids.join(',')  + ")";

            }

            query += " ORDER BY name ASC";
            
            const tagResults = await datastore.sendNativeQuery(query , []);

            // Popola oggetto items
            if ( tagResults.rows.length > 0 ) {

                tagResults.rows.forEach(item => {
                    
                    item.tag = term;
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