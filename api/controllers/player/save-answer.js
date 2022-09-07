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

      var correct = false;

      // compare answers case-insensitive
      // for fuzzy-matching, we could use list.js library
      if(stage.answer.toLowerCase() === answer.toLowerCase())
          correct = true;

      if(correct)
        player.points += stage.points;

      if(player.answers == null)
      {
        player.answers = "[]";
      }
      var jsonAnswers = JSON.parse(player.answers);
      jsonAnswers[jsonAnswers.length] = answer;

      // find next stage: get all stages ordered by ID
      var stages = await Stage.find({
        where: {hunt_id:hunt_id},
        sort: 'id ASC'
      });

      var nextIndex = -1;
      var nextStageId = -1;
      for( c=0; c<stages.length; c++)
      {
        if(stages[c].id == player.current_stage_id)
        {
          nextIndex = c+1;
          break;
        }
      }
      if(nextIndex < stages.length) // fine della caccia
        nextStageId = stages[nextIndex].id;

      // new values for query
      let valuesToSet = {
        hunt_id: hunt_id,
        current_stage_id: nextStageId, // go to next stage
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
