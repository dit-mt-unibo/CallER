/**
 * Action view-create
 *
 * @description Form for a new hunt
 *
 */

module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/abgame/view-create'
        }
    },

    fn: async function() {

        return { pageTitle: "Nuovo gioco A/B" };

    }

}
