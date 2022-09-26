/**
 * Action view-list
 *
 * @description Lists players statistics for current treasure hunt
 */

module.exports = {

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/player/view-list'
        },

        fail: {
            description: 'when query fails',
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }
    },

    fn: async function() {

        let pageTitle = "Classifica Giocatori"; // page title

        var items = []; // players

        try {
            //TODO: passa alla view la huntId:
            items = await Player.find( {
                // huntId: huntId
                sort: 'points DESC'
            });

        }
        catch (err) {

            throw { fail: {
                pageTitle: pageTitle ,
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella player. Error: " + err.message }
            } };

        }

        if ( items.length > 0 ) {

            for (const element of items) {

                try {
                    var hunt = await Hunt.findOne({id: element.hunt_id });
                    element.hunt = hunt.name;
                }
                catch (err) {

                    console.log("Errore query tabella hunt " + err.message);
                    element.hunt = "Non disponibile";

                }

                if ( element.current_stage_id > 0 ){

                    try {     

                        var stage = await Stage.findOne({id: element.current_stage_id });
                        element.stage = stage.position + " - " + stage.name;

                    }
                    catch (err) {

                        console.log("Errore query tabella stage " + err.message);
                        element.stage = "Non disponibile";
                        
                    }

                }
                else {

                    element.stage = "Completato";

                }             

            }

        }

        return { items: items , pageTitle: pageTitle , flash: '' };

    }
}
