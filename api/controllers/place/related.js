/**
 * Per la WebAPP pagina contenuto.
 * 
 * Restituisce un numero limitato e casuale di contenuti di una categoria
 * 
 */
module.exports = {


    friendlyName: 'Related places',
  
  
    description: 'Render related places',
  
  
    inputs: {

        id: {
            description: 'place ID',
            type: 'number'
        },
        cat_id: {
            description: 'category ID',
            type: 'number',
        }

    },
  
  
    exits: {
      success: {
        returnType: 'json',
      },
      fail: {
        description: 'when query fails or return an empty result',
        returnType: 'json',
        // viewTemplatePath: 'pages/error'
      }
    },
  
  
    fn: async function (inputs) {
  
      let items = {};
      let places = {};

      try {
        places = await Place.find({
            where: { category_id: inputs.cat_id , id: { nin: [inputs.id] } },
            sort: 'id ASC',
          });
      }
      catch (err) {
        throw {
          fail: {
            error: { title: "Errore database", message: "Impossibile trovare il contenuto richiesto " + err.message }
          }
        };
      }

      // Solo 3 elementi a caso vengono inviati alla WebApp 
      if ( _.isEmpty(places) === false ) {

        places.sort(function(a, b){return 0.5 - Math.random()});
        items = places.slice(0,3);

      }
  
      return { items };
  
    }
  
  
  };
  