/**
 * Action save
 *
 * @description saves player's data
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
        current_stage_id: {
          type: 'number',
          required: true
        },
        // punteggio accumulato finora
        //TODO: forse dobbiamo calcolarlo qui (server-side),
        // invece di richiedere che lo faccia la app (client-side)
        points: {
          type: 'number',
          required: true
        },

        // campo json con tutte le risposte fornite finora.
        answers: {
          type: 'string',
          required: true
        }
    },

    exits: {

        hunt_id: {
            description: 'validation field hunt_id failed',
            statusCode: 409
        },


    },

    fn: async function({uuid, hunt_id, current_stage_id, points, answers, id}) {

        // new values for query
        let valuesToSet = {
            uuid: uuid ,
            hunt_id: hunt_id,
            current_stage_id: current_stage_id,
            points: points,
            answers: answers,
        };

        response = { 'success' : 0 , 'err' : 'undefined error' };

        if ( _.isUndefined(id) ) {

            await User.create(valuesToSet)
                        .intercept( {name: 'UsageError'} , (err) => {

                            return 'nameFail';

                        } )
                        .intercept( 'E_UNIQUE' , (err) => {

                            return 'uniqueFail';

                        });

        }
        else {

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
              response = { 'success' : 1 , 'err' : "" };

        }

        return response;

    }

}
