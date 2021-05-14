module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/quiz/create'
    }

  },


  fn: async function () {

    let places = [];

    try {

      places = await Place.find({
        sort: 'name ASC'
      });

    }
    catch (err) {
      //
    }        
    // Respond with view.
    return { pageTitle: "Nuovo Quiz", places : places };

  }


};
