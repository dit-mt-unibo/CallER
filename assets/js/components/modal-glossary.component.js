/**
 * <modal-glossary>
 * 
 * Modal window for linking a term to the glossary
 * 
 * @type {Component}
 * 
 */

parasails.registerComponent('modalGlossary', {

    props: [
        'terms', 'search'
    ],

    template: `
    <div class="modal fade" id="modalGlossary" tabindex="-1" role="dialog" aria-labelledby="modalGlossary" aria-hidden="true">
      <div class="modal-dialog" style="max-width:1300px;" role="document">
        <div class="modal-content">          
            <div class="modal-header">
              <h5 class="modal-title">Glossario</h5>              
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h5>Testo selezionato: <small id="glossarySelectedTerm"></small></h5>
              <div class="form-group mt-3">
                <input type="text" class="form-control" placeholder="filtra risultati" v-model="search">
                <input type="hidden" id="glossarySelection">
              </div>
              <div style="height:300px; overflow:auto;">
                <table class="table glossary-table">
                  <thead>
                    <tr>
                      <th width="50%">Identificativo</th>
                      <th width="50%">Vocabolo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!--<tr v-for="term in terms" @click="selectTerm(term.name)" :id="term.name">-->
                    <tr v-for="term in filteredItems" @click="selectTerm(term.name)" :id="term.name">
                      <td>{{ term.name }}</td>
                      <td>{{ term.term }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>            
            <div class="modal-footer">                            
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Chiudi</button>              
              <button @click="save()" data-dismiss="modal" type="submit" class="btn btn-success">
                <span class="button-text">Collega</span>
              </button> 
            </div>          
        </div>
      </div>
    </div>
    `,

    computed: {
      
      // Filters items
      filteredItems() {
        return this.terms.filter(term => {
          
          if ( _.isUndefined(this.search) ) return term;

          if ( term.name.indexOf(this.search) > -1 ) return term;

          return null;
          
        })
      }

    },

    methods: {

        // Emits the click event
        save: async function() {
          
          this.$emit('click');
          var oldValue = $( "#glossarySelection" ).val();

          if ( _.isEmpty(oldValue) === false) {

            $( "#" + oldValue ).removeClass("glossary-table-tr-selected");

          }
          
        },

        // Highlights the selected row in the table
        selectTerm: function(value) {            
          
          var oldValue = $( "#glossarySelection" ).val();

          if ( _.isEmpty(oldValue) === false) {

            $( "#" + oldValue ).removeClass("glossary-table-tr-selected");

          }

          $( "#glossarySelection" ).val(value);
          $( "#" + value ).addClass("glossary-table-tr-selected");

        }

    }

});