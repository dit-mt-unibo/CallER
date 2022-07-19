/**
 * Hunt.js
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

    description: {
      type: 'string',
      required: true,
      maxLength: 65535
    },

    activeFrom: {
      type: 'string',
    },

    activeTo: {
      type: 'string',
     },


  },

};

