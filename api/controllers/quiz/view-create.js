module.exports = {


  friendlyName: 'View create',


  description: 'Display "Create" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/quiz/create'
    }

  },


  fn: async function () {

    // Respond with view.
    return { pageTitle: "Nuovo Quiz" };

  }


};
