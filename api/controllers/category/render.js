module.exports = {


  friendlyName: 'Render',


  description: 'Render category and child items (or categories)',


  inputs: {
    id: {
      description: 'category ID',
      type: 'number',
    }
  },


  exits: {
    success: {
      returnType: 'view',
      viewTemplatePath: 'pages/clientapp/category'
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
      item = await Category.findOne( inputs.id );
    }
    catch (err) {
      throw {
        fail: {
          error: { title: "Errore database", message: "Impossibile trovare la categoria richiesta" }
        }
      };
    }

    let childrenCategories = {};
    childrenCategories = await Category.find({
      where: { parent_id: inputs.id },
      sort: 'id ASC'
    });

    let childrenPlaces = {};
    childrenPlaces = await Place.find({
      where: { category_id: inputs.id },
      sort: 'id ASC'
    });

    return { item, childrenCategories, childrenPlaces };

  }


};
