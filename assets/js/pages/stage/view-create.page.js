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

        var main = {
            dropdown: ['add', 'remove'],
            text: 'Glossario',
            ico: '',
            hasIcon: false,
        };

        var add = {
            fn: openGlossaryModal,
            tag: '',
            title: 'Crea collegamento al glossario',
            text: 'Crea collegamento',
            isSupported: function () { return true; },
            key: '',
            param: trumbowyg,
            forceCss: false,
            class: '',
            hasIcon: false
        };

        var remove = {
            fn: removeLinkGlossary,
            tag: 'span',
            title: 'Rimuovi collegamento al glossario',
            text: 'Rimuovi collegamento'        ,
            isSupported: function () { return true; },
            key: '',
            param: trumbowyg,
            forceCss: false,
            class: '',
            hasIcon: false
        }

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
            glossary: {

                init: function(trumbowyg) {
                    trumbowyg.o.plugins.glossary = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.glossary || {});

                    trumbowyg.addBtnDef('glossary', buildButtonDef(trumbowyg));
                },
                createLink: () => {

                    var word = $( "#glossarySelectedTerm" ).html();
                    var wordId = $( "#glossarySelection" ).val();

                    if ( _.isEmpty(wordId) === false ) {

                        var node = document.createElement("span");
                        node.appendChild(document.createTextNode(word));
                        node.setAttribute("class", "glossary");
                        node.setAttribute("data-id" , wordId);

                        range.deleteContents();
                        range.insertNode(node);

                        activeEditor.execCmd('syncTextarea');

                    }

                }
            }
        }
    });

    /**
     * Gets user's selection and opens the modal window
     *
     * @param editor: trumbowyg editor object
     */
    function openGlossaryModal(editor) {

        var selection = document.getSelection();
        var value = selection.baseNode.data;
        var start = selection.anchorOffset;
        var end = selection.focusOffset;
        range = selection.getRangeAt(0);

        // Range must be at least 1 character long
        if ( range.startOffset < range.endOffset ) {

            $( "#glossarySelectedTerm" ).html( value.substring(start, end) );
            $( "#modalGlossary" ).modal('show');

            activeEditor = editor;

        }

    }

    /**
     * Removes the link to the glossary
     *
     * @param editor: trumbowyg editor object
     */
    function removeLinkGlossary(editor) {

        var selection = document.getSelection();
        range = selection.getRangeAt(0);
        var node = selection.focusNode;
        var parent = node.parentElement;

        // Checks if the selection is a link to the glossary
        if ( parent.nodeName.toLowerCase() == "span" && parent.getAttribute('class').toLowerCase() == "glossary") {

            parent.remove();
            range.deleteContents();
            range.insertNode(node);

            editor.execCmd('syncTextarea');

        }

    }

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
            name: { required: true , maxLength: 150},
            full_text: { required: true , maxLength: 65535},
            image: {
                required: true ,
                custom: function(fileObj) {

                    var result = false;
                    var allowedExts = ['png' , 'jpg' , 'jpeg'];
                    var extension = fileObj.name.split('.').slice(-1).toString().toLowerCase();

                    allowedExts.forEach(elm => {

                        if (extension == elm) {

                            result = true;
                            return;

                        }

                    });

                    return result;

                }
            },
            lat: {
                required: true ,
                custom: function(value) {

                    const pattern = /^[1-9]{1}[0-9]{0,1}[.]{0,1}[0-9]{0,}$/;
                    const match = value.match(pattern);

                    if ( _.isNull(match) ) return false;

                    return ( value >= -90 && value <= 90 );

                }
            } ,
            long: {
                required: true ,
                custom: function(value) {

                    const pattern = /^[1-9]{1}[0-9]{0,2}[.]{0,1}[0-9]{0,}$/;
                    const match = value.match(pattern);

                    if ( _.isNull(match) ) return false;

                    return ( value >= -180 && value <= 180 );

                }

            },
            points: {
                required: true
            },
            hunt_id: {
                required: true,
                custom: function(value) {

                    let HuntID = parseInt(value);
                    return _.isNumber(HuntID);

                }
            },
        },

        // Server error state for the form
        cloudError: '' ,
        saveFailMessage: '',

        // Hunt ID. Select box
        huntId: '',

        // Stage image
        stageImg: '',

        // Glossary terms
        terms: [],

    },

    // Populates formData only in update mode.
    beforeMount: function () {

        if ( _.isUndefined(window.SAILS_LOCALS['item']) == false ) {

          this.formData = window.SAILS_LOCALS['item'];
          this.huntId = (this.formData.hunt_id == null ) ? null : parseInt(this.formData.hunt_id);
          this.formData.lat = ( _.isNull(this.formData.lat) === false ) ? String(this.formData.lat) : null;
          this.formData.long = ( _.isNull(this.formData.long) === false ) ? String(this.formData.long) : null;
          this.formRules["image"] = {}; // image validation is not required in update mode

      }
      else {
        this.formData.choices = ['X','Y','Z','W'];
      }

      this.terms = window.SAILS_LOCALS['terms'];

    },
    mounted: async function () {

        $( "#tbweditor" ).trumbowyg({
            btns: [
                ['undo', 'redo'], // Only supported in Blink browsers
                ['strong', 'em'],
                ['link'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['removeformat', 'glossary'],
                ['fullscreen']
            ],
            removeformatPasted: true,
            plugins: {
                glossary: {}
            }
        } );

        $( "#extra_text" ).trumbowyg({
            btns: [
                ['undo', 'redo'], // Only supported in Blink browsers
                ['strong', 'em'],
                ['link'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['unorderedList', 'orderedList'],
                ['removeformat', 'glossary'],
                ['fullscreen']
            ],
            removeformatPasted: true,
            plugins: {
                glossary: {}
            }
        } );

    },

    methods: {

        parseForm: function () {
            return argins;
        },
        submittedForm: async function () {

          this.syncing = true;
          window.location = '/stage/list';

        },
        submittedUpdateForm: async function() {

          this.syncing = true;
          window.location = '/stage/details/' + this.item.id;

        },
        rejectedForm (err) {
        },

        // Sets hunt ID
        selectOption () {

            this.huntId = this.$refs.huntId.value;

        },


        // Opens local resources
        openResources() {

            this.$refs.file.click();

        },

        // Sets stage image
        setStageImg() {

            this.stageImg = this.$refs.file.files[0];

        },

        // Inserts link
        insertGlossaryLink() {

            $.trumbowyg.plugins.glossary.createLink();

        },

    },
});
