/**
 * Action view-create
 *
 * @description Action for the "add new question" form
 */

//const abgame = require("../../models/abgame");


 module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/abquestion/view-create'
        }
    },

    fn: async function() {

        // Provides options to the select box.
        let abgames = [];
        
        try {

          abgames = await Abgame.find({
                sort: 'name ASC'
            });

        }
        catch (err) {
            //
        }

      return { pageTitle: "Nuova Coppia", abgames: abgames  };

    }

};
