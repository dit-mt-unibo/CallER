/**
 * Glossary Trumbowyg plugin
 */
 (function ($) {
    'use strict';

    // Contains the DOM node selected by the user
    var range;
    // Reference to the active Trumbowyg editor
    var activeEditor;

    var defaultOptions = {};

    /**
     * Defines plugin buttons. Shows the buttons in a dropdown list.
     * The buttons are:
     * - add: adds new link
     * - remove: removes the link
     *
     * @param trumbowyg object
     * @returns dropdown
     */
    function buildButtonDef(trumbowyg) {

        

        trumbowyg.addBtnDef('add', add);
        trumbowyg.addBtnDef('remove', remove);

        return main;

    }

    /**
     * Extends Trumbowyg object adding glossary plugin.
     *
     * Defines createLink method.
     */
    $.extend(true, $.trumbowyg, {
        plugins: {

        }
    });

   


})(jQuery);

/**
 * Parasails for stages forms
 */
parasails.registerPage('view-create', {

    data: {

        syncing: false,
        formData: {
            /* ... */
        },

        // For tracking client-side validation errors in our form
        formErrors: { /* … */ },

        // Form rules
        formRules: {
            name1: { required: true , maxLength: 100},
            name2: { required: true, maxLength: 100 },
            imageUrl1: {
                required: true ,                
            },
            points: {
                required: true
            },
            abgame_id: {
                required: true,
                custom: function(value) {

                  let abgameID = parseInt(value);
                  return _.isNumber(abgameID);

                }
            },
        },

        // Server error state for the form
        cloudError: '' ,
        saveFailMessage: '',

        // Hunt ID. Select box
        abgameId: '',

        // Stage image
        stageImg: '',

        // Glossary terms
        terms: [],

    },

    // Populates formData only in update mode.
    beforeMount: function () {

        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

          this.formData = window.SAILS_LOCALS['item'];
          this.abgameId = (this.formData.ag_game_id == null) ? null : parseInt(this.formData.ag_game_id);

      }
      else {
      }
      
    },
    mounted: async function () {


    },

    methods: {

        parseForm: function () {
            return argins;
        },
        submittedForm: async function () {

          this.syncing = true;
          window.location = '/admin/abquestion/list';

        },
        submittedUpdateForm: async function() {

          this.syncing = true;
          window.location = '/admin/abquestion/details/' + this.item.id;

        },
        rejectedForm (err) {
        },

        // Sets abgame ID
        selectOption () {

          this.abgameId = this.$refs.abgameId.value;

        },


        // Opens local resources
        openResources() {

            this.$refs.file.click();

        },
        

    },
});
