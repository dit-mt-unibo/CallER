/**
 * <ajax-form>
 * -----------------------------------------------------------------------------
 * A form that talks to the backend using AJAX.
 * > For example usage, take a look at one of the forms generated in a new
 * > Sails app when using the "Web app" template.
 *
 * @type {Component}
 *
 * @slot default                     [form contents]
 *
 * @event update:cloudError          [:cloud-error.sync=""]
 * @event update:syncing             [:syncing.sync=""]
 * @event update:formErrors          [:form-errors.sync=""]
 * @event submitted                  [emitted after the server responds with a 2xx status code]
 * @event rejected                   [emitted after the server responds with a non-2xx status code]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('ajaxForm', {

    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // Note:
    // Some of these props rely on the `.sync` modifier re-introduced in Vue 2.3.x.
    // For more info, see: https://vuejs.org/v2/guide/components.html#sync-Modifier
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    props: [
        'syncing',//  2-way bound (:syncing.sync="")
        'cloudError',//  2-way bound (:cloud-error.sync="")
        'action',
        'formErrors',//  2-way bound (:form-errors.sync="")
        'formData',
        'formRules',
        'catParentId', // category parent ID
        'categoryId', // category id for places
        'tbwEditorId', // trumbowyg editor ID
        'tbwEditorField', // trumbowyg field name
        'placeImage', // place field image
        'level', // place. Content difficulty level
        'stageImage',  // stage field image
    'huntId', // hunt id for stages
        'abgameId',

    ],


    data: function () {
        return {
            //
        };
    },

    template: `
  <form @submit.prevent="submit()" @keydown.meta.enter="keydownMetaEnter()">
    <slot name="default"></slot>
  </form>
  `,


    beforeMount: function () {
        //
    },
    mounted: async function () {


        if (this.formRules) {
            var SUPPORTED_RULES = [
                'required', 'isEmail', 'isIn', 'is', 'minLength', 'maxLength',
                'sameAs', 'isHalfwayDecentPassword', 'custom'
            ];
            for (let fieldName in this.formRules) {
                for (let ruleName in this.formRules[fieldName]) {
                    if (_.contains(SUPPORTED_RULES, ruleName)) {
                        // OK.  Good enough.
                        // - - - - - - - - - - - - - - - - - - - - -
                        // FUTURE: move rule rhs checks out here
                        // (so error messages from bad usage are
                        // logged sooner)
                        // - - - - - - - - - - - - - - - - - - - - -
                    } else {
                        let kebabRules = _.map(_.clone(SUPPORTED_RULES), (ruleName) => _.kebabCase(ruleName));
                        let lowerCaseRules = _.map(_.clone(SUPPORTED_RULES), (ruleName) => ruleName.toLowerCase());
                        let ruleIdx = (
                            _.indexOf(kebabRules, ruleName) === -1 ?
                                _.indexOf(lowerCaseRules, ruleName.toLowerCase()) === -1 ?
                                    -1
                                    : _.indexOf(lowerCaseRules, ruleName.toLowerCase())
                                : _.indexOf(kebabRules, ruleName)
                        );
                        if (ruleIdx !== -1) {
                            throw new Error('Did you mean `' + SUPPORTED_RULES[ruleIdx] + '`?  (note the capitalization)\nYou are seeing this error because <ajax-form> encountered an unsupported (but vaguely familiar-looking) client-side validation rule: `' + ruleName + '`.');
                        } else {
                            throw new Error('<ajax-form> does not support that client-side validation rule (`' + ruleName + '`).\n [?] If you\'re unsure, visit https://sailsjs.com/support');
                        }
                    }
                }//?
            }//?
        }

        // Focus our "focus-first" field, if relevant.
        // (but not on mobile, because it can get weird)
        if (typeof bowser !== 'undefined' && !bowser.mobile && this.$find('[focus-first]').length > 0) {
            this.$focus('[focus-first]');
        }
    },
    beforeDestroy: function () {
        //
    },


    methods: {

        keydownMetaEnter: async function () {
            await this._submit();
        },

        submit: async function () {
            await this._submit();
        },

        _submit: async function () {

            // Prevent double-posting.
            if (this.syncing) {
                return;
            }//

            // Clear the userland "cloudError" prop.
            this.$emit('update:cloudError', '');

            // Category form. Adds parent_id key to the formData object
            if ( _.isUndefined(this.catParentId) === false ) {

                this.$set(this.formData, 'parent_id' , this.catParentId);

            }

            // Place form. Adds category_id key to the formData object
            if ( _.isUndefined(this.categoryId) === false ) {

                this.$set(this.formData, 'category_id' , this.categoryId);

            }

            // Place form. Adds level key to the formData object
            if ( _.isUndefined(this.level) === false ) {

                this.$set(this.formData, 'level' , this.level);

            }

            // Place form. Adds image key to the formData object
            if ( _.isUndefined(this.placeImage) === false ) {

                this.$set(this.formData, 'image' , this.placeImage);

            }

            // Place form. Adds extra_text key to the formData object
            if ( $( "#extra_text" ).length ) {

                this.$set(this.formData, 'extra_text', $( "#extra_text" ).trumbowyg('html'));

            }

            // Stage form. Adds hunt_id key to the formData object
            if ( _.isUndefined(this.huntId) === false ) {

              this.$set(this.formData, 'hunt_id' , this.huntId);

            }

            // Stage form. Adds image key to the formData object
            if ( _.isUndefined(this.stageImage) === false ) {

              this.$set(this.formData, 'image' , this.stageImage);

            }

          // Abquestion form. Adds abgame_id key to the formData object
          if (_.isUndefined(this.abgameId) === false) {

            this.$set(this.formData, 'abgame_id', this.abgameId);

          }

            // Adds trumbowyg content to the formData object
            if ( _.isUndefined(this.tbwEditorId) === false ) {

                this.$set(this.formData, this.tbwEditorField , $( "#" + this.tbwEditorId ).trumbowyg('html') );

            }

            if ( $("#glossary_files" ).length ) {

                this.formData['files'] = [];

                if ( _.isUndefined(this.formData['file_image']) === false ) {

                    this.formData['files'].push(this.formData['file_image']);

                }

                if ( _.isUndefined(this.formData['file_audio']) === false ){

                    this.formData['files'].push(this.formData['file_audio']);

                }

            }

            // Determine the argins that will be sent to the server in our request.
            var argins;

            // use the simpler, built-in absorbtion strategy.
            // > This uses the provided form data as our argins, verbatim.  Then it runs
            // > built-in client-side validation, if configured to do so.

            argins = this.formData;

            let formData = this.formData;
            let formErrors = {};

            for (let fieldName in this.formRules) {
                let fieldValue = formData[fieldName];

                for (let ruleName in this.formRules[fieldName]) {
                    let ruleRhs = this.formRules[fieldName][ruleName];
                    let violation;

                    let isFieldValuePresent = (
                        fieldValue !== undefined &&
                        fieldValue !== '' &&
                        !_.isNull(fieldValue)
                    );

                    if (ruleName === 'required' && (ruleRhs === true || ruleRhs === false)) {
                        //  Must be defined, non-null, and not the empty string
                        if (ruleRhs === false) {
                            violation = false;
                        } else {
                            violation = (
                                !isFieldValuePresent
                            );
                        }
                    } else if (!isFieldValuePresent) {
                        // Do nothing.
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                        // Note:
                        // In order to allow use with optional fields, all rules except for
                        // `required: true` are only actually checked when the field value
                        // is "present" -- i.e. some value other than `null`, `undefined`,
                        // or `''` (empty string).
                        //
                        // > Trying to figure out how to handle a conditionally-requiured
                        // > field that uses one of these validations?  For example, a
                        // > "Confirm email" re-entry field for an optional email address?
                        // > Just make `required` validation rule dynamic, and everything
                        // > else will work as expected.
                        // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
                    } else if (ruleName === 'isEmail' && (ruleRhs === true || ruleRhs === false)) {
                        // Must be an email address (unless falsy)
                        if (ruleRhs === false) {
                            violation = false;
                        } else {
                            violation = (
                                !parasails.util.isValidEmailAddress(fieldValue)
                            );
                        }
                    } else if (ruleName === 'isIn' && _.isArray(ruleRhs)) {
                        // Must be one of these things
                        violation = (
                            !_.contains(ruleRhs, fieldValue)
                        );
                    } else if (ruleName === 'is') {
                        // Must be exactly this thing (useful for required checkboxes)
                        violation = (
                            ruleRhs !== fieldValue
                        );
                    } else if (ruleName === 'minLength' && _.isNumber(ruleRhs)) {
                        // Must consist of at least this many characters
                        violation = (
                            !_.isString(fieldValue) ||
                            fieldValue.length < ruleRhs
                        );
                    } else if (ruleName === 'maxLength' && _.isNumber(ruleRhs)) {
                        // Must consist of no more than this many characters
                        violation = (
                            !_.isString(fieldValue) ||
                            fieldValue.length > ruleRhs
                        );
                    } else if (ruleName === 'sameAs' && ruleRhs !== '' && _.isString(ruleRhs)) {
                        // Must match the value in another field
                        let otherFieldName = ruleRhs;
                        let otherFieldValue = formData[otherFieldName];
                        violation = (
                            otherFieldValue !== fieldValue
                        );
                    } else if (ruleName === 'isHalfwayDecentPassword' && (ruleRhs === true || ruleRhs === false)) {
                        // Must be a halfway-decent password
                        // > This is an arbitrary distinction, so change it if you want.
                        // > Just... please use common sense.  And try to avoid engaging
                        // > in security theater.
                        if (ruleRhs === false) {
                            violation = false;
                        } else {
                            violation = (
                                (!_.isString(fieldValue) && !_.isNumber(fieldValue)) ||
                                fieldValue.length < 6
                            );
                        }
                    } else if (ruleName === 'custom' && _.isFunction(ruleRhs)) {
                        // Provided function must return truthy when invoked with the value.
                        try {
                            violation = (
                                !ruleRhs(fieldValue)
                            );
                        } catch (err) {
                            console.warn(err);
                            violation = true;
                        }
                    } else {
                        throw new Error('Cannot interpret client-side validation rule (`' + ruleName + '`) because the configuration provided for it is not recognized by <ajax-form>.\n [?] If you\'re unsure, visit https://sailsjs.com/support');
                    }

                    // If a rule violation was detected, then set it as a form error
                    // and break out of the `for` loop to continue on to the next field.
                    // (We only track one form error per field.)
                    if (violation) {
                        formErrors[fieldName] = ruleName;
                        break;
                    }//?

                }//?
            }//?

            // Whether there are any errors or not, update userland "formErrors" prop
            // so that the markup reflects the new reality (i.e. inline validation errors
            // either get rendered or go away.)
            this.$emit('update:formErrors', formErrors);

            // If there were any form errors, avast.  (Submission will not be attempted.)
            if (Object.keys(formErrors).length > 0) {
                // In development mode, also log a warning
                // (so that it's clear what's going on just in case validation
                // states/messages are not hooked up in the HTML template)
                if (this._environment !== 'production') {
                    console.warn(`<ajax-form> encountered ${Object.keys(formErrors).length} form error${Object.keys(formErrors).length !== 1 ? 's' : ''} when performing client-side validation of "form-data" versus "form-rules".  (Note: This warning is only here to assist with debugging-- it will not be displayed in production.  If you're unsure, check out https://sailsjs.com/support for more resources.)`, _.cloneDeep(formErrors));
                }//?
                return;
            }// (determining argins)


            // Set syncing state to `true` on userland "syncing" prop.
            this.$emit('update:syncing', true);


            // Submit the form
            var failedWithCloudExit;
            var rawErrorFromCloudSDK;
            var result;

            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            // FUTURE: Potentially filter unused data in argins here before proceeding
            // (assuming cloudsdk has that information available)
            // Or better yet, just have `Cloud.*.with()` take care of that automatically.
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

            result = await Cloud[this.action].with(argins)
                .tolerate((err) => {
                    rawErrorFromCloudSDK = err;
                    failedWithCloudExit = err.exit || 'error';
                });


            // When a cloud error occurs, tolerate it, but set the userland "cloudError"
            // prop accordingly.
            if (failedWithCloudExit) {
                this.$emit('update:cloudError', failedWithCloudExit);
            }

            // Set syncing state to `false` on userland "syncing" prop.
            this.$emit('update:syncing', false);

            // If the server says we were successful, then emit the "submitted" event.
            if (!failedWithCloudExit) {
                this.$emit('submitted', result);
            } else {
                this.$emit('rejected', rawErrorFromCloudSDK);
            }

        },

    }
});
