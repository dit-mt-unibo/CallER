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

        return { items: items , pageTitle: pageTitle , flash: '' };

    }
}
