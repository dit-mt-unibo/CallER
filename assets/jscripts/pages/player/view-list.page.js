/**
 * Parasails for view-list page
 */

parasails.registerPage('view-list' , {

    data: {

        // an array object of players from database
        items: [],

        // Filters items by hunt id
        filter_hunt: '',

    },

    computed: {

      writeAnswers(item){
        this.item = item;
        jsonAnswers = JSON.parse(item.answers);
        output = "";
        jsonAnswers.forEach(function(obj) {
          outputString = obj.stage_id + "(" + obj.stage_name + ") : " + obj.answer + "<br/>";
          output += outputString;
        });
        return output;
      },
        // Filters items by hunt id
        filteredItems () {

            let items =  this.items.filter(item => {

                let searchId = _.isUndefined(this.filter_hunt) ? "" : this.filter_hunt.toLowerCase();

                if ( searchId == "" ) return item;

                if ( _.isEmpty(searchId) === false ) {

                    if ( item.hunt_id == searchId)  {
                        item.answers = writeAnswers(item);
                        return item;
                    }
                }

            });

            return items;

        },

    },

    beforeMount: function() {

        this.items = window.SAILS_LOCALS['items'];
        for(item of this.items)
        {
          jsonAnswers = JSON.parse(item.answers);
          output = "";
          jsonAnswers.forEach(function(obj) {
            outputString = obj.stage_name + " (" + obj.stage_id + "): " + obj.answer + "<br/>";
            output += outputString;
          });
          item.answers = output;
        }
    },

    methods: {



    }

})
