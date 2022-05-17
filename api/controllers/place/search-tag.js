/**
 * API per WebApp
 * 
 * @description restituisce un json con i risultati dei places filtrati per tag
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
        
        // Risultati query sendNativeQuery
        var items = [];

        // oggetto datastore di sails per eseguire codice sql
        const datastore = sails.getDatastore();
        
        if ( _.isUndefined(this.req.param('tag')) ) return result;

        // Pulizia input        
        let tag = sails.hooks.sanitize.deepClean(this.req.param('tag')); 

        if ( _.isEmpty(tag) ) return result;

        try{

            var query = `
            SELECT id, name, intro_text, imageUID FROM place
            WHERE JSON_CONTAINS(tags , '"` + _.escape(tag) + `"')
            ORDER BY name ASC
            `;
            
            items = await datastore.sendNativeQuery(query , []);            

        }
        catch (err) {

            console.log(err.message);
            return result;

        }

        result['success'] = 1;

        if ( items.rows.length > 0 ) {

            result['items'] = items.rows;
            result['counter'] = items.rows.length;

        }

        return result;

    }

}