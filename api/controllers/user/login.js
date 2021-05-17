/**
 * Action login
 * 
 * @description Checks user's login details. If login is successful, it stores the userId in the sails session
 */


 module.exports = {

    inputs: {

        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        }

    },

    exits: {
        fail: {
            description: 'login fails',
            statusCode: 409
        }
    },

    fn: async function( {username, password} ) {
        
        // If the user is already logged in, redirect to the homepage
        if ( _.isUndefined( this.req.session.userId ) === false ) { 

            return this.res.redirect('/');

        }

        var user = await User.findOne({ username: username });

        if (!user) throw 'fail';

        await sails.helpers.passwords.checkPassword(password, user.password)
                .intercept('incorrect', 'fail');

        this.req.session.userId = user.id;
        this.req.session.username = user.name;

        return 'success';

    }

};