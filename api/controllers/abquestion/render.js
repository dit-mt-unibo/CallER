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
      item = await Abquestion.findOne(inputs.id);
    }
    catch (err) {
      throw {
        fail: {
          error: {
            title: "Errore database", message: "Impossibile trovare la Coppia richiesta (" + inputs.id + ")"
          }
        }
      };
    }

    return { item };

  }


};
