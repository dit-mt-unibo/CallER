/**
 * API per WebApp
 * 
 * @description restituisce in formato json la parola del giorno presa dal glossario
 */

module.exports = {

    fn: async function(){
        
        const fs = require('fs');

        /**
         * La parola del giorno viene memorizzata in un file temporaneo che serve da cache.
         * Il sistema memorizza nel file una stringa json con i seguenti indici:
         * - id : indice corrente dell'array che contiene tutte le parole estratte dalla tabella glossary
         * - word : oggetto riga della tabella glossary
         * - expire : data di "scadenza" della parola del giorno
         */
        let jsonPath = require('path').resolve(sails.config.appPath, '.tmp/tds_word.json');        
        
        // oggetto json restituito all'utente
        let result = { 'item' : {} };
        // oggetto json parola del giorno estratto dal file tds_word.json
        let dataJson = null;
        // indice corrente dell'array in cui è contenuto il glossario
        let wordIndex = 0;
        // oggetto data odierna
        let today = new Date();

        // popola oggetto dataJson con i dati contenuti nel file temporaneo
        dataJson = await new Promise( (resolve) => {

            fs.readFile(jsonPath , (err, data) => {

                if (err === null) {

                    const objJson = JSON.parse(data.toString());
                    return resolve(objJson);

                }

                return resolve(null);

            });

        });

        // Controlla che l'ultima parola del giorno sia ancora attuale confrontando il valore della chiave expire con la data odierna
        if ( dataJson != null ) {

            const expire = new Date(dataJson.expire);            
            wordIndex = dataJson.id;

            // se la parola è scaduta, incrementa l'indice corrente wordIndex per ottenere la parola successiva
            // altrimenti usa i dati contenuti nell'oggetto dataJson per popolare result
            if ( today.getTime() > expire.getTime() ) {
                
                wordIndex++;

            }
            else {

                result['item'] = dataJson.word;
                return result;

            }            

        }

        try {

            /**
             * Il sistema non ha trovato il file temporaneo tds_word.json oppure la parola del giorno è scaduta.
             * Estrae dalla tabella glossary tutte le parole, imposta la data di scadenza ad oggi ore 23:59:59,
             * scrive la nuova parola nel file temporaneo e infine popola l'oggetto result
             */
            let items = await Glossary.find({
                sort: 'id ASC'
            });

            if ( items.length == 0 ) return result;
            
            today.setHours(23);
            today.setMinutes(59);
            today.setSeconds(59);

            // se wordIndex supera il numero di parole disponibili nel glossario, viene reimpostato a 0
            if ( wordIndex > items.length ) wordIndex = 0;

            dataJson = { 
                "id" : wordIndex ,
                "word" : items[wordIndex],
                "expire" : today.toString()
            };

            fs.writeFile(jsonPath , JSON.stringify(dataJson) , (err) => {

                if (err) console.log(err.message);

            });

            result['item'] = items[wordIndex];

        }
        catch(err){

            console.log("Errore parola del giorno " + err.message);

        }        

        return result;
        
    }
}