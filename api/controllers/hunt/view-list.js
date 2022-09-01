/*
 * Action view-list
 *
 * @description :: Action for handling the Hunt homepage
 *
 */

module.exports = {


    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/hunt/view-list'
        },

        fail: {
            description: "when query fails",
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function () {

        let pageTitle = "Cacce al tesoro"; // page title
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        var items = []; // hunt objects.

        try {

            items = await Hunt.find( {
                sort: 'id ASC'
            });

        }
        catch (err) {

            throw { fail: {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella hunt" }
            } };

        }

        /*
        // Then, iterates hunt times and gets their stages, if any.
        if ( items.length > 0 ) {

          for (const element of items) {

              try {

                  var stages = await Stage.find( {
                      where: { hunt_id: element.id },
                      sort: 'id ASC'
                  });

              }
              catch (err) {

                  var stages = [];

              }

              element.stages = stages;

          }

      }*/

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
