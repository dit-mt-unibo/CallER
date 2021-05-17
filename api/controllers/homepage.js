/**
 * Action homepage
 * 
 * @description Action for the backend homepage
 */
 

 module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/homepage'
        }
    },

    fn: async function() {   

        return { pageTitle: "" };

    }

};