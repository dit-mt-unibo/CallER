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
      required: true,
      custom: function(filename) {          
          return sails.hooks.validation.validateExtension(filename, ['png' , 'jpg' , 'jpeg']);
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

    question: {
      type: 'string',
      required: true
    },

    answer: {
      type: 'string',
      required: true
    },

    hunt_id: {
      type: 'number',
      required: false
    },

    points: {
      type: 'number',
      defaultsTo: 1,
    }
  },

};
