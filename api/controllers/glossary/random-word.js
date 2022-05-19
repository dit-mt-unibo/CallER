/**
 * API per WebApp
 * 
 * @description restituisce in formato json una parola a caso del glossario eccetto la parola del giorno
 */

module.exports = {

    fn: async function(){

        const fs = require('fs');

        let jsonPath = require('path').resolve(sails.config.appPath, '.tmp/tds_word.json');

        let result = { item: {} };

        let excludeId = await new Promise( (resolve) => {

            fs.readFile(jsonPath , (err, data) => {

                if (err === null) {

                    const objJson = JSON.parse(data.toString());
                    return resolve(objJson.word.id);

                }

                return resolve(0);

            });

        });

        try {

            let items = await Glossary.find({
                id : { '!=' : [excludeId]}
            });

            let randomIndex = Math.floor(Math.random() * items.length);
            result['item'] = items[randomIndex];
            
        }
        catch(err){

            console.log(err);

        }

        return result;
    }
}