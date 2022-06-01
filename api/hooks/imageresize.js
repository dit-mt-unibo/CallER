/**
 * Hook image-resize
 * 
 * @description resizes image based on sharp module
 */

 module.exports = function(sails){
    
    const sharp = require('sharp');
    const modulePath = require('path');
    // thresholds for optimize function
    const maxWidth = 1200; // px
    const optDensity = 72; //dpi

    return {        

        /**
         * Optimizes an image.
         * If necessary, resize the size of the image by setting width to maxWidth
         * If necessary, set the density to optDensity
         * @param {string} folderPath folder relative path
         * @param {string} filename file name with extension
         */
        optimize: async function(folderPath , filename) {

            const inputPath = modulePath.resolve(sails.config.appPath, folderPath) + "/" + filename;
            const outputPath = modulePath.resolve(sails.config.appPath, folderPath) + "/" + filename;
            
            var image = null;

            try {

                image = sharp(inputPath);

            }
            catch(err){

                console.log(err.message);
                image = null;

            }            

            if ( image != null ){

                const buffer = await image.metadata()
                                        .then( function(metadata)  {

                                            if (metadata.width > maxWidth) {

                                                return image.resize( { width: maxWidth })
                                                    .withMetadata( { density: optDensity } )
                                                    .toBuffer();

                                            }

                                            if (metadata.density > optDensity) {

                                                return image.withMetadata( { density: optDensity } )
                                                        .toBuffer();

                                            }
                                            
                                            return null;

                                        })
                                        .catch (err => { 
                                            
                                            console.log(err.message);                                        
                                            return null;

                                        });

                if ( buffer != null ) {

                    try {
    
                        await sharp(buffer).withMetadata().toFile(outputPath);
    
                    }
                    catch(err){
    
                        console.log(err.message);
    
                    }                
    
                }

            }                                    

        },

        /**
         * Resizes the image according to the param width 
         * @param {string} folderInputPath input file folder relative path
         * @param {string} folderOutputPath output folder relative path
         * @param {string} filename file name with extension
         * @param {number} width the new size of the image
         */
        resize : async function(folderInputPath , folderOutputPath , filename , width){

            const inputPath = modulePath.resolve(sails.config.appPath, folderInputPath) + "/" + filename;
            const outputPath = modulePath.resolve(sails.config.appPath, folderOutputPath) + "/" + filename;
            
            try {

                await sharp(inputPath)
                        .withMetadata()
                        .resize( { width: width} )
                        .toFile(outputPath);

            }
            catch(err){
                
                console.log(err.message);

            }            

        }
    }
}