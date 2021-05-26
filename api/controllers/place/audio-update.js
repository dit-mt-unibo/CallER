/**
 * Action audio-update
 * 
 * @description updates the link of vocaroo audio
 */

 module.exports = {

    inputs: {

        id: {
            type: 'number',
        },
        audio: {
            type: 'string',
        }
    },

    exits: {

        success: {
            statusCode: 200
        },
        saveFail: {
            description: 'when update query fails',
            statusCode: 409
        }   

    },

    fn: async function(inputs, exits) {
        
        if ( _.isEmpty(inputs.audio) === false ) {

            inputs.audio = vocarooEmbedUrl(inputs.audio);

        }
        
        var result = await Place.updateOne( { id: inputs.id } ).set( { audio: inputs.audio } )
                        .intercept( (err) => {

                            return exits.saveFail();

                        });

        if (result) {
            
            return exits.success( { audio: inputs.audio} ); 

        }
        else {
            
            return exits.saveFail();

        }  

    }    

}

/**
 * Returns embed url for vocaroo audio
 * @param url value sent by user
 * @returns string
 */
 function vocarooEmbedUrl(url) {

    var embedUrl = "https://vocaroo.com/embed/";
    var vocarooAudioId = "";
  
    // es. https://voca.ro/1k4QJmNqQgnu
    const pattern = /^https:\/\/voca.ro\/|^https:\/\/www.vocaroo.com\/|^https:\/\/vocaroo.com\//;
    const match = url.match(pattern);
  
    if (_.isNull(match) === false) {
  
      vocarooAudioId = url.split('/').slice(-1);
  
    }
    
    if (_.isEmpty(vocarooAudioId) === false) {
      return embedUrl + vocarooAudioId;
    }
  
    // if all fails, return the url as is, let's trust the user!
    return url;
  
  }