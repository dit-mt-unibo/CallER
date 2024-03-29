/**
 * Action view-list
 *
 * @description Action for handling the homepage of stages
 */


module.exports = {


    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/stage/view-list'
        },

        fail: {
            description: "when query fails",
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }

    },

    fn: async function () {

        let pageTitle = "Tappe"; // page title
        let flash = ''; // message to be displayed on the page when session.flash is not empty

        var items = []; // stages

        try {

            items = await Stage.find().sort([
              { hunt_id: 'ASC' },
              { position: 'ASC' },
            ]);

        }
        catch (err) {

            throw { fail: {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella stage" }
            } };

        }

        if ( items.length > 0 ) {

          for (const element of items) {

              try {
                  var hunt = await Hunt.findOne({id: element.hunt_id });
                  element.hunt_name = hunt.name;
              }
              catch (err) {
                throw { fail: {
                  pageTitle: pageTitle ,
                  error: { title: "Errore database" , message: "Impossibile trovare la caccia al tesoro per una tappa" }
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
