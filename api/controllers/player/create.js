/**
 * API per WebApp.
 *
 * Sovrascrive la action di default fornita da Sails (https://sailsjs.com/documentation/reference/blueprint-api)
 */

module.exports = {

    friendlyName: 'Create player',

    inputs: {

        email: {
          description: "player's email",
          type: 'string',
          required: true,
          maxLength: 150
        },
        hunt_id: {
            description: 'hunt ID',
            type: 'number',
            required: true
        }

    },


    exits: {
      success: {
        returnType: 'json',
      },
      fail: {
        description: 'when query fails or return an empty result',
        returnType: 'json',
        // viewTemplatePath: 'pages/error'
      }
    },


    fn: async function (inputs){

        const crypto = require('crypto');
        let response = {};

        // generate uuid
        inputs.uuid = crypto.randomUUID();

        try{

            await Player.create(inputs);

            response = { 'success' : 1 , 'err' : "" };

        }
        catch(err){

            response = { 'success' : 0 , 'err' : err.message };

        }

        return response;

    }

}
