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

    position: {
      type: 'number',
      defaultsTo: 1
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

    question: {
      type: 'string',
      required: false
    },

    choices: {
      type: 'json',
      description: 'json array contains the choices in a multiple choice quiz',
      defaultsTo: '[]',
    },

    answer: {
      type: 'string',
      required: false
    },

    task: {
      type: 'string',
      description: 'alternative to a question: a task to be performed and scored offline, e.g. send a picture of this monument to game@forliviamo.it',
      required: false
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
