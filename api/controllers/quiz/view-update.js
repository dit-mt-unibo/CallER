module.exports = {


  friendlyName: 'View update',


  description: 'Display "Update" page.',

  inputs: {
    id: {
      type: 'number',
      allowNull: false
    }
  },
  exits: {

    success: {
      viewTemplatePath: 'pages/quiz/update'
    },
    notFound: {
      description: 'Non abbiamo trovato il quiz richiesto!',
      responseType: 'notFound'
    }

  },


  fn: async function ({ id }) {

    let pageTitle = "Modifica Quiz";
    // Items for the form
    let item = {};
    // Provides options to the select box. Only main categories will be available in the select box
    let places = [];

    item = await Quiz.findOne({ id: id });
    if (!item) { throw 'notFound'; }

    sails.log(item);

    try {
      places = await Place.find({
        sort: 'name ASC'
      });

    }
    catch (err) {
      //
    }

    return { quiz: item, pageTitle: pageTitle, places: places };

  }


};
