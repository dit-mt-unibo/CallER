/**
 * Action image-update
 *
 * @description updates the image of a stage
 */

 module.exports = {

    inputs: {

        id: {
            type: 'number',
        },
        oldImage: {
            type: 'string',
        },
        image_caption: {
            type: 'string',
            allowNull: true
        }
    },

    exits: {

        success: {
            statusCode: 200
        },
        saveFail: {
            description: 'when update query fails',
            statusCode: 409
        },
        uploadFail: {
            description: 'when image upload fails',
            statusCode: 409
        }

    },

    fn: async function(inputs, exits) {

        if ( _.isEmpty(inputs.oldImage) ) {

            try {

                await Stage.updateOne( { id: inputs.id } ).set( { image_caption : inputs.image_caption } )
                .intercept( (err) => {

                    return exits.saveFail({ description: 'Query update error. Error: ' + err.message });

                } );

            }
            catch(err) {

                return exits.saveFail({ description: 'Query update error. Error: ' + err.message });

            }

            return exits.success();

        }
        else {

            this.req.file('image').upload({

                maxBytes: 3245728,
                dirname: require('path').resolve(sails.config.appPath, '.tmp/public/images/contenuti'),
            },
            async function whenDone (err, uploadedFiles) {

                if(err) return exits.uploadFail();

                var imgSrc = uploadedFiles[0].filename;
                var imgUID = uploadedFiles[0].fd.replace(/^.*[\\\/]/, '');

                await sails.hooks.imageresize.optimize('.tmp/public/images/contenuti' , imgUID);
                await sails.hooks.imageresize.resize('.tmp/public/images/contenuti' , '.tmp/public/images/contenuti/thumbs' , imgUID , 300);

                sails.hooks.filemanager.copy('.tmp/public/images/contenuti' , 'assets/images/contenuti' , imgUID);
                sails.hooks.filemanager.copy('.tmp/public/images/contenuti/thumbs' , 'assets/images/contenuti/thumbs' , imgUID);

                try {

                    var result = await Stage.updateOne( { id: inputs.id } ).set( { image: imgSrc , imageUID: imgUID , image_caption : inputs.image_caption} )
                    .intercept( (err) => {

                        return exits.saveFail({ description: 'Query update error. Error: ' + err.message });

                    } );

                }
                catch(err) {

                    return exits.saveFail({ description: 'Query update error. Error: ' + err.message });

                }

                if (result) {

                    sails.hooks.filemanager.delete('assets/images/contenuti' , inputs.oldImage);
                    sails.hooks.filemanager.delete('assets/images/contenuti/thumbs' , inputs.oldImage);
                    sails.hooks.filemanager.delete('.tmp/public/images/contenuti' , inputs.oldImage);
                    sails.hooks.filemanager.delete('.tmp/public/images/contenuti/thumbs' , inputs.oldImage);

                    return exits.success( { image: imgSrc, imageUID: imgUID });

                }

            });

        }

    }

}
