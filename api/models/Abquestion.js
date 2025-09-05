/**
 * abquestion.js
 *
 * @description :: Singola domanda A/B, con due immagini (url),
 *   il nome o soggetto e la descrizione che verra' rivelata dopo la risposta.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name1: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    name2: {
      type: 'string',
      required: true,
      maxLength: 100
    },

    description1: {
      type: 'string',
      required: true,
      maxLength: 250
    },

    description2: {
      type: 'string',
      required: true,
      maxLength: 250
    },

    imageUrl1: {
      type: 'string',
      description: 'URL of a picture for the first dish/object/place',
      required: true,    
    },

    imageUrl2: {
      type: 'string',
      description: 'URL of a picture for the second dish/object/place',
      required: true,
    },

    full_text: {
      type: 'string',
      required: true,
      maxLength: 65535
    },

    answer: {
      type: 'string',
      description: 'dynamic, it is either 1 or 2, depending on which object has been chosen to be guessed.',
      required: false
    },

    abgame_id: {
      type: 'number',
      required: true
    },

    points: {
      type: 'number',
      defaultsTo: 1,
    }
  },

};
