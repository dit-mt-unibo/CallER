const abgame = require("../../models/Abgame");

module.exports = {

  friendlyName: 'Render',

  description: 'Render game and questions (link to questions)',

  inputs: {
    id: {
      description: 'game ID',
      type: 'number',
    }
  },

  exits: {
    success: {
      returnType: 'json',
      //viewTemplatePath: 'pages/clientapp/abgame'
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
      item = await Abgame.findOne(inputs.id);
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare il gioco richiesto" }
        }
      };
    }

    let children = {};
    children = await Abquestion.find({
      select: ["id" , "name1", "name2"],
      where: { abgame_id: inputs.id },
      sort: 'id ASC'
    });

    return { item, children };

  }


};
