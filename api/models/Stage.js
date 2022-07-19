/**
 * Stage.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    name: {
      type: 'string',
      required: true,
      maxLength: 150
    },

    full_text: {
      type: 'string' ,
      required: true,
      maxLength: 65535
    },

    image: {
      type: 'string',
      description: 'filename. Allowed file extensions png, jpg, jpeg',
      required: false, //TODO: cambia a true appena sono pronti i controller per fare l'upload per bene
      custom: function(filename) {
          return validateExtension(filename, ['png' , 'jpg' , 'jpeg']);
      }
    },

    imageUID: {
        type: 'string',
        description: 'uuid of the image file, which has been uploaded under assets/images/contenuti',
    },

    image_caption: {
        type: 'string',
        description: "image caption",
        allowNull: true
    },

    lat: {
      type: 'number',
      allowNull: true,
      description: 'latitudine'
    },

    long: {
      type: 'number',
      allowNull: true,
      description: 'longitudine'
    },

    gmaps_place_id: {
      type: 'string',
      description: 'google maps place_id',
      allowNull: true,
      maxLength: 300
    },

    hunt_id: {
      type: 'number',
      required: false
    },

  },

};

// TODO: this should be common between Place and Stage, in a shared module?
/**
 * Validates file extension
 *
 * @param filename: string filename
 * @param allowedExts: array allowed file extensions
 * @return bool
 */
 function validateExtension(filename, allowedExts) {

  if (filename == '') return true;

    var result = false;
    var extension = filename.split('.').slice(-1).toString().toLowerCase();

    allowedExts.forEach(elm => {

        if (extension == elm) {

            result = true;
            return;

        }

    });

    return result

}
