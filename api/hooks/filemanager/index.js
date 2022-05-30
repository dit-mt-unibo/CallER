/**
 * Hook filemanager
 * 
 * @description collection of methods for managing file. Based on Node fs module
 */

module.exports = function(sails) {

    const fs = require('fs');
    const objPath = require('path');

    return {        

        /**
         * Deletes file
         * 
         * @param {string} folder folder relative path
         * @param {string} filename file name with extension
         */
        delete: function(folder , filename){

            var filePath = objPath.resolve(sails.config.appPath, folder) + '/' + filename;
            fs.unlink(filePath , (err => {

                if (err) console.log(err.message);

            }) );

        },

        /**
         * Copies file
         * 
         * @param {string} source source folder relative path 
         * @param {string} destination destination folder relative path
         * @param {string} filename file name with extension
         */
        copy: function(source, destination, filename){

            let srcPath = objPath.resolve(sails.config.appPath, source) + '/' + filename;
            let dstPath = objPath.resolve(sails.config.appPath, destination) + '/' + filename;

            fs.copyFile(srcPath , dstPath , (err => {

                if (err) console.log(err.message);

            }));
            
        }

    }

}