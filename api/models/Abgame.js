/**
 * abgame.js
 *
 * @description :: Un gioco A/B, con una serie di domande A/B o Vero/Falso scelte a random
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true,
      maxLength: 155
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

