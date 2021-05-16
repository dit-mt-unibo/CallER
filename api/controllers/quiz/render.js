module.exports = {

  friendlyName: 'Render',
  description: 'Render Quiz.',

  inputs: {
    id: {
      description: 'quiz ID',
      type: 'number',
    }
  },


  exits: {
    success: {
      returnType: 'view',
      viewTemplatePath: 'pages/clientapp/quiz'
    },
    fail: {
      description: 'when query fails or return an empty result',
      returnType: 'view',
      viewTemplatePath: 'pages/error'
    }
  },


  fn: async function (inputs) {

    let item = {};
    try {
      item = await Quiz.findOne( inputs.id );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare il quiz richiesta" }
        }
      };
    }

    return { item };

  }


};
