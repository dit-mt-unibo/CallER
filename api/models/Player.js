/**
 * Player.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // necessario per la registrazione e per inviare eventuali comunicazioni e premi.
    email: {
      type: 'string',
      required: true,
      maxLength: 320,
      custom: function(email) {

        return sails.hooks.validation.validateEmail(email);

      }
    },

    // identificatore unico (guid) creato server-side e tenuto su cookie sul client
    uuid: {
      type: 'string',
      maxLength: 50
    },

    // la caccia al tesoro a cui il partecipante si è iscritto (a cui sta giocando)
    hunt_id: {
      type: 'number',
      required: true
    },

    // a quale tappa è arrivato (quella da superare!)
    current_stage_id: {
      type: 'number'
    },

    // punteggio accumulato finora
    points: {
      type: 'number'
    },

    // campo json con tutte le risposte fornite finora.
    answers: {
      type: 'string'
        // array di:
          //  id tappa : ...
          // nome tappa: ...
          // risposta:
    }
  },

};
/*
  logica:
  Quando si va sulla pagina principale della caccia al tesoro,
  c'è un form (unico input: email) per registrarsi e cominciare.
  Il server genera un id opaco per l'utente e lo manda tramite cookie.

  Ogni giocatore ha una sola caccia al tesoro attiva alla volta (hunt_id).
  Ogni volta che dà una risposta per una tappa, aggiorniamo il record:
    - current_stage_id diventa la prossima o -1 se terminata
    - points viene aggiornato se la risposta è giusta.
*/

