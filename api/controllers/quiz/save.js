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
    },

    extra_text_block: {
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
    var extra_text_block = inputs.extra_text_block;

    if ( _.isUndefined(inputs.id) ) {

      try {

        result = await Quiz.create(inputs).fetch();

      }
      catch (err) {
        
        return exits.saveFail( {description: 'Query create error. Server error: ' + err.message  } );

      }   

    }
    else {

      try {

        result = await Quiz.updateOne( {id: inputs.id} ).set(inputs); 

      }
      catch(err) {

        return exits.saveFail({description: 'Query update error. Server error: ' + err.message  } );

      }      

    }    

    // Enable/Disable blocks on place table
    try {
      
      await Place.updateOne({ id: inputs.place_id }).set({ 
            video_block: video_block , 
            audio_block: audio_block , 
            extra_text_block: extra_text_block 
          });

    }
    catch (err) {

      return exits.blocksFail({description: 'Query blocks error. Server error: ' + err.message  } );

    }     
    
    return exits.success({ quiz: result, video_block: video_block, audio_block: audio_block, extra_text_block: extra_text_block });

  }

};
