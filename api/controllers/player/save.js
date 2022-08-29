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

                this.req.session.flash = {type: 'error' , message: 'Aggiornamento giocatore non riuscito'};

            }

        }

        this.req.session.flash = {type: 'success' , message: 'Dati giocatore salvati correttamente'};

        /*
         * This is a pure API, we shouldn't need or want redirects.
         * We're still in the Hunt game, going to next stage.
         */

    }

}
