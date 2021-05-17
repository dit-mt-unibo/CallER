/**
 * Action view-create
 * 
 * @description Action for the "add new user" form
 */
 

module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/user/view-create'
        }
    },

    fn: async function() {   

        return { pageTitle: "Nuovo utente" };

    }

};