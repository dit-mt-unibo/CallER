/**
 * Action save
 *
 * @description save or update stage
 */

 module.exports = {

    inputs: {

        name: {
            type: 'string',
            required: true
        },
        position: {
          type: 'number',
          required: false
        },
        full_text: {
            type: 'string',
            required: true
        },
        image_caption: {
            type: 'string',
            allowNull: true
        },

        lat: {
            type: 'ref',
            required: true
        },
        long: {
          type: 'ref',
          required: true
        },

        hunt_id: {
            type: 'number',
            required: false
        },
        id: {
            type: 'number',
            allowNull: true
        },

        question: {
          type: 'string',
          allowNull: true
        },

        choices: {
          type: 'json',
        },

        answer: {
          type: 'string',
        },

        task: {
          type: 'string',
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

            this.req.file('image').upload({

                maxBytes: 3245728,
                dirname: require('path').resolve(sails.config.appPath, 'assets/images/contenuti'),
            },
            async function whenDone (err, uploadedFiles) {

                if (err) return exits.uploadFail({ description : 'upload image failed. Server error:' + err.message });

                inputs.image = uploadedFiles[0].filename;
                inputs.imageUID = uploadedFiles[0].fd.replace(/^.*[\\\/]/, '');

                await sails.hooks.imageresize.optimize('assets/images/contenuti' , inputs.imageUID);
                await sails.hooks.imageresize.resize('assets/images/contenuti' , 'assets/images/contenuti/thumbs' , inputs.imageUID , 300);

                try {

                  // find last stage in the same hunt:
                  var lastStage = await Stage.find({
                    where: { hunt_id: inputs.hunt_id },
                    limit: 1,
                    sort: 'position DESC'
                  });

                  if(lastStage.length > 0)
                  {
                    inputs.position = lastStage[0].position + 1;
                  }

                  // creiamo la nuova tappa:
                  var result = await Stage.create(inputs).fetch();

                }
                catch(err) {

                    return exits.saveFail({ description: 'Query create error. Error: ' + err.message });

                }

                if (result) {

                    session.flash = {type: 'success' , message: 'Dati salvati correttamente'};
                    return exits.success();

                }

            });

        }
        else {

            try {

                var result = await Stage.updateOne( {id: inputs.id} ).set(inputs);

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

