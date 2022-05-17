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
        let term = sails.hooks.sanitize.deepClean(this.req.param('term'));

        if ( term.length < 4 ) return result;        

        try{

            /**
             * Le query sono tre in modo da avere i suggerimenti ordinati
             * prima per titolo, poi per testo introduttivo e infine per tag.             
             * 
             * Effettua la query cercando la stringa nella colonna name
             */
            const nameResults = await Place.find( { 
                where: { name:  { contains: term } } ,
                select: ['id' , 'name' , 'intro_text' , 'full_text_plain' , 'imageUID'],
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
             * Effettua la query cercando la stringa nelle colonne intro_text e full_text_plain.
             * Esclude dai risultati gli ID dei contenuti già trovati con la query precedente.
             */
            const datastore = sails.getDatastore();
            let uCaseTerm = term[0].toUpperCase() + term.substring(1);

            var queryTexts = `
            SELECT id, name, intro_text, full_text_plain, imageUID FROM place
            WHERE 
            MATCH(full_text_plain) AGAINST('` + term + `*' IN BOOLEAN MODE) OR
            MATCH(intro_text) AGAINST('` + term + `*' IN BOOLEAN MODE) OR
            MATCH(full_text_plain) AGAINST('` + uCaseTerm + `*' IN BOOLEAN MODE) OR
            MATCH(intro_text) AGAINST('` + uCaseTerm + `*' IN BOOLEAN MODE)
            `

            if ( ids.length > 0 ) {

                queryTexts += " AND id NOT IN (" + ids.join(',')  + ")";

            }

            queryTexts += " ORDER BY name ASC";

            const textResults = await datastore.sendNativeQuery(queryTexts , []);

            // Popola oggetto items
            if ( textResults.rows.length > 0 ) {

                textResults.rows.forEach(item => {
                    
                    items.push(item);
                    ids.push(item.id);

                });

            }

            /**
             * Query per ricerca tra i tags.
             * Esclude dai risultati gli ID dei contenuti già trovati con le query precedenti.
             */
            //const datastore = sails.getDatastore();

            var queryTags = `
            SELECT id, name, intro_text, full_text_plain, imageUID FROM place
            WHERE JSON_CONTAINS(LOWER(tags) , '"` + term.toLocaleLowerCase() + `"')
            `
            if ( ids.length > 0 ) {

                queryTags += " AND id NOT IN (" + ids.join(',')  + ")";

            }

            queryTags += " ORDER BY name ASC";
            
            const tagResults = await datastore.sendNativeQuery(queryTags , []);

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