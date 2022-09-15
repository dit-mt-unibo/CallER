/**
 * Action saveAnswer
 *
 * @description process answer to a stage and update player data
 *
 * Tecnicamente, potremmo passare solo uuid e answer..
 */

module.exports = {

    inputs: {

      uuid: {
        type: 'string',
        required: true
      },
      hunt_id: {
        type: 'number',
        required: true
      },
      answer: {
        type: 'string',
        required: false
      },
    },

    exits: {

        hunt_id: {
            description: 'validation field hunt_id failed',
            statusCode: 409
        },


    },

    // in caso di successo, ritorna current_stage_id aggiornato, se la risposta è giusta
    fn: async function({uuid, hunt_id, answer}) {

      uuid = sails.hooks.sanitize.cleanHtml(uuid);
      answer = sails.hooks.sanitize.cleanHtml(answer);

      // get the current Player object:
      var player = await Player.findOne({uuid:uuid});
      if(player == null)
      {
        response = { 'success' : 0 , 'err' : 'impossibile trovare il giocatore con questo uuid' };
        return response;
      }

      // get the stage object
      var stage = await Stage.findOne({id:player.current_stage_id});
      if(stage == null)
      {
        response = { 'success' : 0 , 'err' : 'impossibile trovare la tappa corrente' };
        return response;
      }

      if(player.answers == null)
      {
        player.answers = "[]";
      }

      var jsonAnswers = JSON.parse(player.answers);
      var thisAnswer = {
        stage_id: stage.id,
        stage_name: stage.name,
        answer: answer
      };
      jsonAnswers.push(thisAnswer);

      var nextStagePosition = stage.position +1;

      if(!stage.task) // se c'è un'attività, il controllo è offline (umano)
      {
        // controlla validità risposta e aggiorna punteggio:
        // compare answers case-insensitive
        // for fuzzy-matching, we could use list.js library
        if(stage.answer.toLowerCase() === answer.toLowerCase())
            player.points += stage.points;
      }

      // new values for query
      let valuesToSet = {
        hunt_id: hunt_id,
        current_stage_id: nextStagePosition, // go to next stage
        points: player.points,
        answers: JSON.stringify(jsonAnswers),
      };

      response = { 'success' : 0 , 'err' : 'undefined error' };

      var result = await Player.updateOne( {id: player.id} ).set(valuesToSet)
                                .intercept( {name: 'UsageError'} , (err) => {

                                    return 'nameFail';

                                } )
                                .intercept( 'E_UNIQUE' , (err) => {

                                    return 'uniqueFail';

                                });

      if ( _.isUndefined(result) ) {
          response = { 'success' : 0 , 'err' : 'Aggiornamento giocatore non riuscito' };
      }
      else
      {
        response = { 'success' : 1 , 'err' : "" , 'current_stage_id' : nextStageId, 'correctAnswer' : correct};
      }

      return response;

    }

}
