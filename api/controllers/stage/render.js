module.exports = {


  friendlyName: 'Render',


  description: 'Render stage',


  inputs: {
    id: {
      description: 'stage ID',
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
      item = await Stage.findOne( {
        select: ['name' , 'full_text' , 'imageUID' , 'image_caption' , 'lat' , 'long' , 'question' , 'choices' , 'task' , 'position'],
        where: { id: inputs.id }
      } );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare la tappa richiesta" }
        }
      };
    }

    return { item };

  }


};
