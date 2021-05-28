module.exports = {
  friendlyName: 'Delete',
  description: 'Delete quiz.',
  inputs: {
    
    id: {
      description: 'Quiz ID',
      type: 'number',
      required: true
    },
    place_id: {
      type: 'number',
      required: true
    }

  },

  exits: {

    deleteFail: {
      description: 'when delete query fails',
      statusCode: 409
    },
    blocksFail: {
      description: 'when place query fails',
      statusCode: 409
    }

  },


  fn: async function (inputs, exits) {

    var result = await Quiz.destroyOne(inputs.id);

    if (result) {
      
      // Enable/Disable blocks on place table
      await Place.updateOne({ id: inputs.place_id }).set({ video_block: 0 , audio_block: 0 })
      .intercept((err) => {
        
        return exits.blocksFail();

      }); 

    }
    else {

      return exits.deleteFail();

    }

    return exits.success();

  }


};
