module.exports = {


  friendlyName: 'View list',


  description: 'Display "List" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/quiz/list'
    }

  },


  fn: async function () {

    let pageTitle = "Quiz"; // page title
    let items = []; // quiz from database 
    let flash = ''; // message to be displayed on the page when session.flash is not empty

    try {

      items = await Quiz.find({
        sort: [{ id: 'ASC' }]
      });

    }
    catch (err) {

      throw {
        fail: {
          pageTitle: pageTitle,
          error: { title: "Errore database", message: "Impossibile effetuare query select sulla tabella Quiz" }
        }
      };

    }

    if (_.isUndefined(this.req.session.flash) === false) {

      flash = {
        type: this.req.session.flash.type,
        message: this.req.session.flash.message
      };

      // Deletes session flash. Avoids endless loop
      delete this.req.session.flash;

    }

    return { items: items, pageTitle: pageTitle, flash: flash };

  }

};


