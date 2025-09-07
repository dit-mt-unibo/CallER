/**
 * Action save
 *
 * @description save or update abquestion
 */

 module.exports = {

    inputs: {
        
     name1: {
       type: 'string',
       required: true
     },

     name2: {
       type: 'string',
       required: true
     },

     description1: {
       type: 'string',
       required: true
     },

     description2: {
       type: 'string',
       required: true
     },

     imageUrl1: {
       type: 'string',
       required: true
     },

     imageUrl2: {
       type: 'string',
       required: true
     },

     full_text: {
       type: 'string',
       required: false
     },

        
        abgame_id: {
            type: 'number',
            required: false
        },
        id: {
            type: 'number',
            allowNull: true
        },
        
        points: {
          type: 'number'
        }
    },

    exits: {

        saveFail: {
            description: 'when save/update query fails',
            statusCode: 409
        },
        uploadFail: {
            description: 'when image upload fails',
            statusCode: 409
        }

    },

    fn: async function(inputs, exits) {

        var session = this.req.session;

        if ( _.isUndefined(inputs.id) ) {
          try {
                  
                  // creiamo la nuova Coppia:
                  var result = await Abquestion.create(inputs).fetch();

          }
          catch(err) {
                    return exits.saveFail({ description: 'Query create error. Error: ' + err.message });

          }

          if (result) {
            session.flash = {type: 'success' , message: 'Dati salvati correttamente'};
            return exits.success();
          }

        }
        else {

            try {

              var result = await Abquestion.updateOne({ id: inputs.id }).set(inputs);

            }
            catch(err) {

                return exits.saveFail({ description: 'Query update error. Error: ' + err.message });

            }

            if ( result ) {

                session.flash = {type: 'success' , message: 'Dati salvati correttamente'};
                return exits.success();

            }

        }

    }

}

