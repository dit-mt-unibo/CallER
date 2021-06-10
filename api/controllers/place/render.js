module.exports = {


  friendlyName: 'Render',


  description: 'Render place and quiz (if it exists)',


  inputs: {
    id: {
      description: 'place ID',
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

    let item = {};
    try {
      item = await Place.findOne( inputs.id );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare il contenuto richiesto" }
        }
      };
    }

    item.quiz = await Quiz.findOne({ place_id: item.id });

    return { item };

  }


};
