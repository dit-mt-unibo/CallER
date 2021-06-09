/**
 * Action view-create
 * 
 * @description Form for a new term
 * 
 */

module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/glossary/view-create'
        }
    },

    fn: async function() {   

        return { pageTitle: "Nuovo vocabolo" };

    }

}