/**
 * Action view-list
 *
 * @description Action for handling the homepage of questions
 */

//const abquestion = require("../../models/abquestion");


module.exports = {


    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/abquestion/view-list'
        },

        fail: {
            description: "when query fails",
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function () {

        let pageTitle = "Coppie A/B"; // page title
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        var items = []; // abquestions

        try {

          items = await Abquestion.find().sort([
              { abgame_id: 'ASC' },              
          ]);
          console.log("trovati " + items.length + " items");

        }
        catch (err) {

            throw { fail: {
                pageTitle: pageTitle ,
              error: { title: "Errore database", message: err } //"Impossibile effetuare query select sulla tabella Abquestion" }
            } };

        }

        if ( items.length > 0 ) {

          for (const element of items) {

            try {
              var abgame = await Abgame.findOne({ id: element.abgame_id });
                  element.abgame_name = abgame.name;
              }
              catch (err) {
                throw { fail: {
                  pageTitle: pageTitle ,
                  error: { title: "Errore database" , message: "Impossibile trovare il gioco per questa Coppia" }
                } };
              }

          }

        }

        if ( _.isUndefined( this.req.session.flash ) === false ) {

            flash = {
                type: this.req.session.flash.type,
                message: this.req.session.flash.message
            };

            // Deletes session flash. Avoids endless loop
            delete this.req.session.flash;

        }

        return { items: items , pageTitle: pageTitle , flash: flash };

    }

}
