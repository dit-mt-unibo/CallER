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
            viewTemplatePath: 'pages/hunt/view-create'
        }
    },

    fn: async function() {

        return { pageTitle: "Nuova Caccia al Tesoro" };

    }

}
