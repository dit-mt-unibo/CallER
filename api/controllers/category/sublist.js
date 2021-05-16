module.exports = {


  friendlyName: 'Sublist',

  description: 'Sublist category.',


  inputs: {
    id: {
      description: 'category ID',
      type: 'number',
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/clientapp/home'
    },

    fail: {
      description: "when query fails",
      responseType: 'view',
      viewTemplatePath: 'pages/error'
    }

  },


  fn: async function (inputs) {

    if (_.isUndefined(inputs.id))
      inputs.id = null;
    var items = []; // categories. The order of categories follows the parent-child relationship   
    try {

      items = await Category.find({
        where: { parent_id: inputs.id, id: { nin: [1] } }, // escludi la categoria speciale #1 (home) per adesso.
        sort: 'id ASC'
      });

    }
    catch (err) {

      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile effetuare query select sulla tabella category" }
        }
      };

    }
    // All done.
    return { items: items }; 

  }


};
