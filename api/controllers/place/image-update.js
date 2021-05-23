/**
 * Action image-update
 * 
 * @description updates the image of a place
 */

 module.exports = {

    inputs: {

        id: {
            type: 'number',
        },
        oldImage: {
            type: 'string'
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

        this.req.file('image').upload({

            maxBytes: 1000000000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/images/contenuti'),                
        },
        async function whenDone (err, uploadedFiles) {
                
           if(err) return exits.uploadFail();  

           var imgSrc = uploadedFiles[0].filename;
           var imgUID = uploadedFiles[0].fd.replace(/^.*[\\\/]/, '');                            

            try {
                
                var result = await Place.updateOne( { id: inputs.id } ).set( { image: imgSrc , imageUID: imgUID} )
                .intercept( (err) => {                         
                    
                    return exits.saveFail();

                } );

            }   
            catch(err) {
                //
            }                                     

            if (result) {

                deleteOldImage(inputs.oldImage);

                return exits.success( { image: imgSrc, imageUID: imgUID }); 

            }                              
    
        });   

    }    

}

/**
 * Deletes the old images from .tmp and assets folders
 * @param imageUID
 */
function deleteOldImage(imageUID) {
    
    const fs = require('fs');
    var filePath = require('path').resolve(sails.config.appPath, 'assets/images/contenuti') + '/' + imageUID;
    var filePathTmp = require('path').resolve(sails.config.appPath, '.tmp/public/images/contenuti') + '/' + imageUID;

    fs.unlink(filePath, function(err) {});
    fs.unlink(filePathTmp, function(err) { });

}