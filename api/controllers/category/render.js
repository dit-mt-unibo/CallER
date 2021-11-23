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
      returnType: 'json',
      //viewTemplatePath: 'pages/clientapp/category'
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

    /**
     * Imposta un'immagine per ogni categoria.
     * L'immagine viene presa dal primo luogo associato alla categoria
     */
    childrenCategories.forEach(async (elm, index) => {
        
        childrenCategories[index].imageUID = "";

        const response = await Place.find({
                            where: { category_id: elm.id },
                            sort: 'id ASC'
                        });
        
        if ( typeof response === 'undefined' ) return;

        try {

            childrenCategories[index].imageUID = response[0].imageUID;

        }
        catch (err) {

            childrenCategories[index].imageUID = "";
            
        }        

    });

    let childrenPlaces = {};
    childrenPlaces = await Place.find({
      where: { category_id: inputs.id },
      sort: 'id ASC'
    });

    return { item, childrenCategories, childrenPlaces };

  }


};
