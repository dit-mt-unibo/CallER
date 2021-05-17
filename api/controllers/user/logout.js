/**
 * Action logout
 * 
 * @description Log out user from the app
 */


 module.exports = {

    fn: async function() {
        
        // If the user is not logged in, redirect to the login page
        if ( _.isUndefined( this.req.session.userId ) ) { 

            return this.res.redirect('/login');

        }

        delete this.req.session.userId;

        return this.res.redirect('/login');

    }

};