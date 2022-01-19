/**
 * API per WebApp
 * 
 * @description restituisce un json con i risultati dei places filtrati in base al tag inviato dall'utente
 */

module.exports = {

    fn: async function() {

        var result = { success: 0 , counter: 0 , items: [] };
        var items = [];
        const datastore = sails.getDatastore();
        
        if ( _.isUndefined(this.req.param('tag')) ) return result;

        const sanitizeHtml = require('sanitize-html');
        let tag = sanitizeHtml(this.req.param('tag') , {
            allowedTags: [],
            allowedAttributes: {},
        });        

        if ( _.isEmpty(tag) ) return result;

        try{

            var query = `
            SELECT id, name, intro_text, full_text FROM place
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