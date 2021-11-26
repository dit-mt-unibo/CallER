/**
 * Action view-list
 * 
 * @description Lists users' feedbacks
 */

module.exports = {

    exits: {

        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/feedback/view-list'
        },

        fail: {
            description: 'when query fails',
            responseType: 'view',
            viewTemplatePath: 'pages/error'
        }
    },

    fn: async function() {

        let pageTitle = "Valutazioni WebApp"; // page title
        
        var items = []; // feedbacks
        
        try {

            items = await Feedback.find( {                 
                sort: 'createdAt DESC' 
            }).populate('place_id');

        }
        catch (err) {

            throw { fail: { 
                pageTitle: pageTitle , 
                error: { title: "Errore database" , message: "Impossibile effetuare query select sulla tabella feedback. Error: " + err.message } 
            } };

        }

        return { items: items , pageTitle: pageTitle , flash: '' };

    }
}