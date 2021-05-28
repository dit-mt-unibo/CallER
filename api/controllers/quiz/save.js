module.exports = {

  friendlyName: 'Save',

  description: 'Save quiz.',

  inputs: {

    id: {
      type: 'number',
      allowNull: true
    },

    type: {
      type: 'number',
      defaultsTo: 0
    },

    question: {
      type: 'string',
      require: true
    },

    choices: {
      type: 'json',
      description: 'json array contains the choices in a multiple choice quiz'
    },

    answer: {
      type: 'string',
      required: true
    },

    place_id: {
      type: 'number',
      required: true
    },

    video_block: {
      type: 'number',
      required: true
    },
    
    audio_block: {
      type: 'number',
      required: true
    }
  },


  exits: {
    
    saveFail: {
      description: 'when save/update query fails',
      statusCode: 409
    },
    blocksFail: {
      description: 'when place query fails',
      statusCode: 409
    }

  },


  fn: async function (inputs, exits) {        

    var result = [];
    var video_block = inputs.video_block;
    var audio_block = inputs.audio_block;

    if ( _.isUndefined(inputs.id) ) {

      try {

        result = await Quiz.create(inputs)
                .intercept( (err) => {

                  return exits.saveFail();

                }).fetch();

      }
      catch (err) {
        
        return exits.saveFail();

      }   

    }
    else {

      try {

        result = await Quiz.updateOne( {id: inputs.id} ).set(inputs)
            .intercept((err) => {
              
              return exits.saveFail();

            }); 

      }
      catch(err) {

        return exits.saveFail();

      }      

    }    

    // Enable/Disable blocks on place table
    await Place.updateOne({ id: inputs.place_id }).set({ video_block: video_block , audio_block: audio_block })
              .intercept((err) => {
                
                return exits.blocksFail();

              }); 
    
    return exits.success({ quiz: result, video_block: video_block, audio_block: audio_block });

  }

};
