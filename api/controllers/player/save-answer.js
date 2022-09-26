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
        required: false,
        description: "contiene l'ID dell'elemento selezionato nel quiz a risposta multipla. Può essere vuoto"
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

      var currentStage = null;
      var next_stage_id = 0;
      var positionToFind = -1;

      // get all stages for the current Hunt
      var stages = await Stage.find({
        where: {hunt_id:player.hunt_id},
        sort: 'position ASC'
      });
      for(const stage of stages)
      {
        if(stage.position == positionToFind) // we found next stage, we're done
        {
          next_stage_id = stage.id;
          break;
        }

        if(stage.id == player.current_stage_id )
        {
          currentStage = stage;
          positionToFind = stage.position +1;
        }
      }
      // now:
      //  currentStage contains the current stage;
      //  next_stage_id contains the id of the next stage (or 0 is we're at the end of the game)
      //  even if we don't need it, positionToFind contains the pos. of next stage.

      if(currentStage == null)
      {
        response = { 'success' : 0 , 'err' : 'impossibile trovare la tappa corrente' };
        return response;
      }      

      if(player.answers == null)
      {
        player.answers = "[]";
      }

      var jsonAnswers = JSON.parse(player.answers);
      
      /**
       * tramite l'indice contenuto in answer, recupero la risposta in formato testo,
       * per poi assegnarla all'oggetto thisAnswer.answer
       */
      let full_text_answer = "";

      if ( _.isEmpty(answer) === false ) {
 
        if ( _.isUndefined(currentStage.choices[answer]) === false ) {
 
          full_text_answer = currentStage.choices[answer];
 
        }
 
      }

      var thisAnswer = {
        stage_id: currentStage.id,
        stage_name: currentStage.name,
        answer: full_text_answer
      }; 
      jsonAnswers.push(thisAnswer);

      var correctAnswer = false;
      if(!currentStage.task) // se c'è un'attività, il controllo è offline (umano)
      {
        // controlla validità risposta e aggiorna punteggio:        
        if(currentStage.answer == answer)
        {
            player.points += currentStage.points;
            correctAnswer = true;
        }
      }
      else
      {
        // se c'è un task, per default la risposta è 'giusta'
        correctAnswer = true;
      }

      // new values for query
      let valuesToSet = {
        hunt_id: hunt_id,
        current_stage_id: next_stage_id, // go to next stage
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
        response = { 'success' : 1 , 'err' : "" , 'current_stage_id' : next_stage_id, 'correctAnswer' : correctAnswer};
      }

      return response;

    }

}
