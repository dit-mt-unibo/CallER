/**
 * Action save
 * 
 * @description saves user's data
 */

module.exports = {

    inputs: {

        name: {
            type: 'string',
            require: true       
        },
        surname: {
            type: 'string',
            required: true
        },
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: false
        },
        newPassword: {
            type: 'string'            
        },
        id: {
            type: 'number',
            allowNull: true
        }
    },

    exits: {

        nameFail: {
            description: 'validation field name failed',
            statusCode: 409
        },
        surnameFail: {
            description: 'validation field surname failed',
            statusCode: 409
        },
        usernameFail: {
            description: 'validation field username failed',
            statusCode: 409
        },
        passwordFail: {
            description: 'validation field password failed',
            statusCode: 409
        },
        uniqueFail: {
            description: 'occurs when username already exists',
            statusCode: 409
        }

    },

    fn: async function({name, surname, username, password, newPassword, id}) {        

        // new values for query
        let valuesToSet = { 
            name: name , 
            surname: surname,
            username: username
        };

        if ( _.isUndefined(id) ) {            

            valuesToSet['password'] = await sails.helpers.passwords.hashPassword(password);

            await User.create(valuesToSet)
                        .intercept( {name: 'UsageError'} , (err) => {

                            return 'nameFail';

                        } )
                        .intercept( {surname: 'UsageError'} , (err) => {

                            return 'surnameFail';
                            
                        })
                        .intercept( {username: 'UsageError'} , (err) => {

                            return 'usernameFail';

                        })
                        .intercept( {password: 'UsageError'} , (err) => {

                            return 'passwordFail';

                        })
                        .intercept( 'E_UNIQUE' , (err) => {

                            return 'uniqueFail';

                        });

        }
        else {
            
            if ( _.isUndefined(newPassword) === false ) {

                valuesToSet['password'] = await sails.helpers.passwords.hashPassword(newPassword);

            }

            var result = await User.update( {id: id} ).set(valuesToSet)
                                    .intercept( {name: 'UsageError'} , (err) => {

                                        return 'nameFail';

                                    } )
                                    .intercept( {surname: 'UsageError'} , (err) => {

                                        return 'surnameFail';
                                        
                                    })
                                    .intercept( {username: 'UsageError'} , (err) => {

                                        return 'usernameFail';

                                    })
                                    .intercept( {password: 'UsageError'} , (err) => {

                                        return 'passwordFail';

                                    })
                                    .intercept( 'E_UNIQUE' , (err) => {

                                        return 'uniqueFail';
            
                                    });

            if ( _.isUndefined(result) ) {

                this.req.session.flash = {type: 'error' , message: 'Aggiornamento utente non riuscito'};

            }

        }
        
        this.req.session.flash = {type: 'success' , message: 'Dati utente salvati correttamente'};
        
        /*
         * Redirects to the categories homepage.
         * Redirection is provided by the method submittedForm of parasails object see view-create.page.js
         */

    }

}