/**
 * API per WebApp.
 * 
 * Sovrascrive la action di default fornita da Sails (https://sailsjs.com/documentation/reference/blueprint-api)
 */

module.exports = {

    friendlyName: 'Create feedback',
  
    inputs: {

        rate: {
            description: 'rate 1-5',
            type: 'number',
            required: true
        },
        comment: {
            description: "user's comment",
            type: 'string',
            allowNull: true,
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

        let response = {};
        inputs.ip = this.req.ip;

        try{

            await Feedback.create(inputs);

            response = { 'success' : 1 , 'err' : "" };

        }
        catch(err){

            response = { 'success' : 0 , 'err' : err.message };

        }

        return response;

    }

}