/**
 * <ajax-button>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('ajaxButton', {

    props: [
        'syncing'
    ],

    data: function () {
        return {
            //
        };
    },


    template: `
  <button @click="click()" type="submit" class="btn btn-success" :class="[syncing ? 'syncing' : '']">
    <span class="button-text" v-if="!syncing"><slot name="default">Submit</slot></span>
    <span class="button-loader clearfix" v-if="syncing">
      <slot name="syncing-state">Invio in corso...</slot>
    </span>
  </button>  
  `,

    beforeMount: function () {
        //
    },
    mounted: async function () {
        //
    },
    beforeDestroy: function () {
        //
    },
    methods: {

        click: async function () {
            this.$emit('click');            
        },

    }
});
