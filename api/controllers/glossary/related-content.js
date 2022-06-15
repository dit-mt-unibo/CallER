/**
 * API per WebApp
 * 
 * @description restituisce in formato json i contenuti in cui la parola passata come paramentro è presente
 */

module.exports = {

    fn: async function(){

        items = [];

        // Pulizia input
        let term = sails.hooks.sanitize.deepClean(this.req.param('term'));
        let pattern = '<span class="glossary" data-id="' + term + '">';

        try{

            //const results = await datastore.sendNativeQuery(query , []);

            //if ( results.rows.length > 0 ) items = results.rows;

            items = await Place.find({
                where: {
                    full_text: { contains: pattern }
                },
                select: ['id' , 'name' , 'intro_text' , 'level' , 'imageUID'],
                sort: "name ASC"
            });

        }
        catch(err){

            console.log(err.message);

        }

        return items;
    }
}