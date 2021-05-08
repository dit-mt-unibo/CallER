/**
 * <text-truncate>
 * 
 * A paragraph with truncated text
 * 
 */

 parasails.registerComponent('textTruncate', {

    props: [
        'text',
    ],

    data: function () {
        return {
            //
        };
    },


    template: `
  <p id="truncate-text">
    {{ text | truncate }}
  </p>
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
        //
    },
    filters: {
        truncate(str, len = 50) {

            _.trim(str);

            if ( str.length > len ) {

                return str.substring(0, len) + "...";

            }
            else {

                return str;

            }

          },
    }
});
