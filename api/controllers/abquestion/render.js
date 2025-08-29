module.exports = {


  friendlyName: 'Render',


  description: 'Render question',


  inputs: {
    id: {
      description: 'abquestion ID',
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
      item = await abquestion.findOne({
        select: ['name1', 'name2', 'description1', 'description2', 'imageUrl1', 'imageUrl2', 'full_text', 'points'],
        where: { id: inputs.id }
      } );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare la Coppia richiesta" }
        }
      };
    }

    return { item };

  }


};
