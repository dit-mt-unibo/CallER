module.exports = {


  friendlyName: 'Render',


  description: 'Render hunt and stages (link to stages)',


  inputs: {
    id: {
      description: 'hunt ID',
      type: 'number',
    }
  },


  exits: {
    success: {
      returnType: 'json',
      //viewTemplatePath: 'pages/clientapp/hunt'
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
      item = await Hunt.findOne( inputs.id );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare la caccia al tesoro richiesta" }
        }
      };
    }


    let children = {};
    children = await Stage.find({
      where: { hunt_id: inputs.id },
      sort: 'id ASC'
    });

    return { item, children };

  }


};
