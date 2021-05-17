/**
 * Action view-login
 * 
 * @description action for the login form
 */


module.exports = {

    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/user/view-login'
        }
    },

    fn: async function() {

        // If the user is already logged in, redirect to the homepage
        if ( _.isUndefined( this.req.session.userId ) === false ) { 

            return this.res.redirect('/');

        }

    }

};