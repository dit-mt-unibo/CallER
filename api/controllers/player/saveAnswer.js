/**
 * Action saveAnswer
 *
 * @description process answer to a stage and update player data
 *
 * Tecnicamente, potremmo passare solo id e answer..
 */

module.exports = {

    inputs: {

        hunt_id: {
          type: 'number',
          required: true
        },
        current_stage_id: {
          type: 'number',
          required: true
        },
        answer: {
          type: 'string',
          required: true
        },
    },

    exits: {

        hunt_id: {
            description: 'validation field hunt_id failed',
            statusCode: 409
        },


    },

    fn: async function({uuid, hunt_id, current_stage_id, answer, id}) {


        if ( _.isUndefined(id) ) {
            return 'undefinedIdFail';
        }
        else {

          // get the stage object
          var stage = Stage.findOne({id:current_stage_id});

          var correct = false;

          // compare answers case-insensitive
          // for fuzzy-matching, we could use list.js library
          if(stage.answer.toLowerCase() === answer.toLowerCase())
              correct = true;

          // get the current Player object and update/copy the answers field:
          var player = await Player.findOne({id:id});

          if(correct)
            player.points += stage.points;

          var jsonAnswers = JSON.parse(player.answers);
          jsonAnswers[jsonAnswers.length] = answer;

          // new values for query
          let valuesToSet = {
            hunt_id: hunt_id,
            current_stage_id: current_stage_id +1, // go to next stage
            points: player.points,
            answers: JSON.stringify(jsonAnswers),
          };

          response = { 'success' : 0 , 'err' : 'undefined error' };

          var result = await Player.update( {id: id} ).set(valuesToSet)
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
            response = { 'success' : 1 , 'err' : "" };
          }

          return response;

        }


    }

}
