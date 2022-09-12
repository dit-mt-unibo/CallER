/**
 * Action view-create
 *
 * @description Action for the "add new stage" form
 */


 module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/stage/view-create'
        }
    },

    fn: async function() {

        // Provides options to the select box.
        let hunts = [];
        // Terms from glossary table
        let terms = [];

        try {

            hunts = await Hunt.find({
                sort: 'name ASC'
            });

            terms = await Glossary.find( {sort: 'name ASC'} );

        }
        catch (err) {
            //
        }

        return { pageTitle: "Nuova tappa" , hunts: hunts , terms: terms };

    }

};
