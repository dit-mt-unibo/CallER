/**
 * <quiz-form>
 * 
 * Shows some information about the quiz.
 * By button "Modifica" shows a form to update the quiz
 * 
 * @type {Component}
 * 
 * 
 * @event submit: form submit
 * @event save: save button click event
 * @event changeMode: switches between form mode and view mode
 * 
 */

 parasails.registerComponent('quizForm', {

    props: [
      
      'syncing',      
      'formMessage',
      'item',
      'mode', // view (quiz infos) || form (shows form)          
    
    ],

    data: function () {
     
        return {
          options: ['Risposta A' , 'Risposta B' , 'Risposta C' , 'Risposta D']
        };
  
      },
    
      beforeMount: function() {
        //
      },

    template: `
    <div class="card" style="width:50%">      
      <div v-if="mode == 'view'">
        <p v-if="!item.quiz" class="card-text" style="margin-top:20px;">
            Aggiungi un nuovo quiz
        </p>
        <div align="left" v-if="item.quiz" style="margin:20px;">
          <p class="font-weight-bold">{{item.quiz.question | truncate}}</p>
          <ul class="list-group" v-for="choice in item.quiz.choices">
            <li class="list-group-item">              
              <div style="display: inline-block; width:5%;">
                  <i v-if="choice == item.quiz.answer" class="bi-check-circle-fill text-success"></i>
              </div>
              <div style="display: inline-block; width:80%;">{{ choice | truncate }}</div>
            </li>             
          </ul>
          <p v-if="item.video_block == 0 && item.audio_block == 0 && item.extra_text_block == 0" style="margin-top:15px;">Nessun contenuto è bloccato dal quiz</p>
          <p v-if="item.video_block == 1" style="margin-top:10px;">- Contenuto video bloccato;</p>
          <p v-if="item.audio_block == 1" style="margin-top:10px;">- Contenuto audio bloccato;</p>
          <p v-if="item.extra_text_block == 1" style="margin-top:10px;">- Contenuto testo aggiuntivo bloccato;
        </div>
        <p v-if="formMessage.deleteError" class="text-danger">{{formMessage.deleteError}}</p>        
        <div style="margin:10px 0 20px 0;">
            <button type="button" v-if="!item.quiz" @click="changeMode('form')" class="btn btn-success col-2">Aggiungi</button>
            <button type="button" v-if="item.quiz" @click="deleteQuiz()" class="btn btn-danger mr-2 col-2">Rimuovi</button>
            <button type="button" v-if="item.quiz" @click="changeMode('form')" class="btn btn-primary col-2">Modifica</button>
        </div>
      </div>
      <div align="left" v-if="mode == 'form'" class="card-body">        
        <form @submit.prevent="submit()">                  
          <div class="form-group col-11">
            <label :class="[formMessage.question ? 'text-danger' : '']">
                Domanda
            </label>
            <textarea v-if="!item.quiz" name="question" class="form-control" :class="[formMessage.question ? 'is-invalid' : '']" id="question"></textarea>
            <textarea v-if="item.quiz" v-model="item.quiz.question" name="question" class="form-control" :class="[formMessage.question ? 'is-invalid' : '']" id="question"></textarea>
            <p align="left" v-if="formMessage.question" class="text-danger">{{formMessage.question}}</p>            
          </div>
          <div class="form-group col-11">
            <label :class="[formMessage.answA ? 'text-danger' : '']">
                Risposta A
            </label>
            <textarea v-if="!item.quiz" name="answA" class="form-control" :class="[formMessage.answA ? 'is-invalid' : '']" id="answA" rows="1"></textarea>
            <textarea v-if="item.quiz" v-model="item.quiz.choices[0]" name="answA" class="form-control" :class="[formMessage.answA ? 'is-invalid' : '']" id="answA" rows="1"></textarea>
            <p align="left" v-if="formMessage.answA" class="text-danger">{{formMessage.answA}}</p>            
          </div>
          <div class="form-group col-11">
            <label :class="[formMessage.answB ? 'text-danger' : '']">
                Risposta B
            </label>
            <textarea v-if="!item.quiz" name="answB" class="form-control" :class="[formMessage.answB ? 'is-invalid' : '']" id="answB" rows="1"></textarea>
            <textarea v-if="item.quiz" v-model="item.quiz.choices[1]" name="answB" class="form-control" :class="[formMessage.answB ? 'is-invalid' : '']" id="answB" rows="1"></textarea>
            <p align="left" v-if="formMessage.answB" class="text-danger">{{formMessage.answB}}</p>            
          </div>
          <div class="form-group col-11">
            <label :class="[formMessage.answC ? 'text-danger' : '']">
                Risposta C
            </label>
            <textarea v-if="!item.quiz" name="answC" class="form-control" :class="[formMessage.answC ? 'is-invalid' : '']" id="answC" rows="1"></textarea>
            <textarea v-if="item.quiz" v-model="item.quiz.choices[2]" name="answC" class="form-control" :class="[formMessage.answC ? 'is-invalid' : '']" id="answC" rows="1"></textarea>
            <p align="left" v-if="formMessage.answC" class="text-danger">{{formMessage.answC}}</p>            
          </div>
          <div class="form-group col-11">
            <label :class="[formMessage.answD ? 'text-danger' : '']">
                Risposta D
            </label>
            <textarea v-if="!item.quiz" name="answD" class="form-control" :class="[formMessage.answD ? 'is-invalid' : '']" id="answD" rows="1"></textarea>
            <textarea v-if="item.quiz" v-model="item.quiz.choices[3]" name="answD" class="form-control" :class="[formMessage.answD ? 'is-invalid' : '']" id="answD" rows="1"></textarea> 
            <p align="left" v-if="formMessage.answD" class="text-danger">{{formMessage.answD}}</p>   
          </div>
          <div class="form-group col-11">
            <label :class="[formMessage.answer ? 'text-danger' : '']">
              Risposta corretta
            </label>
            <select v-if="!item.quiz" name="answer" class="form-control" id="answer">
              <option value=""></option>
              <option v-for="(option,index) in options" :value="index">              
                {{ option }}
              </option>
            </select>
            <select v-if="item.quiz" name="answer" class="form-control" id="answer">
              <option value=""></option>
              <option v-if="item.quiz" v-for="(option,index) in options" :value="index" :selected="item.quiz.choices[index] == item.quiz.answer">
                {{ option }}
              </option>
            </select>            
            <p align="left" v-if="formMessage.answer" class="text-danger">{{formMessage.answer}}</p>
          </div>
          <div class="form-group col-11">
            <label class="mr-3">
              Applica blocco a:
            </label>
            <div class="form-check form-check-inline">
              <input v-if="!item.quiz" name="video-block" class="form-check-input" type="checkbox" value="1" id="video-block">
              <input v-if="item.quiz" name="video-block" class="form-check-input" type="checkbox" value="1" id="video-block" :checked="item.video_block == 1">
              <label class="form-check-label">
                Video
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input v-if="!item.quiz" name="audio-block" class="form-check-input" type="checkbox" value="1" id="audio-block">
              <input v-if="item.quiz" name="audio-block" class="form-check-input" type="checkbox" value="1" id="audio-block" :checked="item.audio_block == 1">
              <label class="form-check-label">
                Audio
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input v-if="!item.quiz" name="extra-text-block" class="form-check-input" type="checkbox" value="1" id="extra-text-block">
              <input v-if="item.quiz" name="extra-text-block" class="form-check-input" type="checkbox" value="1" id="extra-text-block" :checked="item.extra_text_block == 1">
              <label class="form-check-label">
                Testo aggiuntivo
              </label>
            </div>
          </div>
          <input v-if="item.quiz" type="hidden" name="id" :value="item.quiz.id" id="id">
          <p v-if="formMessage.saveError" class="text-danger">{{formMessage.saveError}}</p>
          <div class="row justify-content-center">
            <button @click="changeMode('view')" type="button" class="btn btn-secondary mr-2 col-2">Annulla</button>              
            <button @click="save()" type="submit" class="btn btn-success col-2">
              <span class="button-text" v-if="!syncing">Salva</span>
              <span class="clearfix" v-if="syncing">Invio in corso...</span>
            </button>
          </div>
        </form>
      </div>
    </div>    
    `,

    mounted: async function () {

      this.syncing = false;
      this.formMessage = {};      
      this.mode = 'view';

    },
  
    beforeDestroy: function() {
  
    },
  
    methods: {

        openPreview: function() {

          this.$emit('preview');

        },
        
        save: async function() {
                  
          this.formMessage = {};
          this.$emit('click');

        },

        changeMode: function(mode) {

          this.syncing = false;
          this.mode = mode;          
          this.formMessage = {};        

        },

        deleteQuiz: async function() {

          this.syncing = true;

          var data = { id: this.item.quiz.id , place_id: this.item.id }

          // Submit the form
          var failedWithCloudExit;

          await Cloud['deleteQuiz'].with(data)                                 
                  .tolerate((err) => {                  
                      failedWithCloudExit = err.exit || 'error';
                  });

          // When an error occurs, tolerate it, but set the userland "formMessage"
          if (failedWithCloudExit) {
              
            this.formMessage['deleteError'] = "Errore durante l'eliminazione del quiz";       

          }

          this.syncing = false;

          // Data update was successful
          if (!failedWithCloudExit) {
            
            this.item.quiz = null;
            this.mode = 'view';          

          }

      },

        submit: async function() {        
          
            // inputs validation
            if ( this.validate() === false ) {                
              
              return;

            }           

            this.syncing = true;

            let choices = [
              $( "#answA" ).val(),
              $( "#answB" ).val(),
              $( "#answC" ).val(),
              $( "#answD" ).val(),
            ];            

            let answer = $( "#answer" ).val();
            let videoBlock = $("#video-block").is(":checked") ? 1 : 0 ;
            let audioBlock = $("#audio-block").is(":checked") ? 1 : 0 ;
            let textBlock = $("#extra-text-block").is(":checked") ? 1 : 0 ;

            var data = { 
              question: $( "#question" ).val(),
              choices: choices,
              answer: choices[answer],
              place_id: this.item.id,
              video_block: videoBlock,
              audio_block: audioBlock,
              extra_text_block: textBlock,
            };

            if ( _.isUndefined( $( "#id" ) ) === false ) {

              data['id'] = $( "#id" ).val();

            }

            // Submit the form
            var failedWithCloudExit;

           var result = await Cloud['saveQuiz'].with(data)                                 
                    .tolerate((err) => {                  
                        failedWithCloudExit = err.exit || 'error';
                    });

            // When an error occurs, tolerate it, but set the userland "formMessage"
            if (failedWithCloudExit) {
              
              this.formMessage['saveError']= "Errore durante la creazione del quiz";

              if (failedWithCloudExit == 'blockFail') {

                this.formMessage['saveError']= "Quiz creato, ma blocchi contenuti non applicati";

              }

            }

            this.syncing = false;

            // Data save/update was successful
            if (!failedWithCloudExit) {
                            
              this.item.quiz = result.quiz;
              this.item.video_block = result.video_block;
              this.item.audio_block = result.audio_block;
              this.item.extra_text_block = result.extra_text_block;
              this.mode = 'view';          

            }
            
        },
        
        validate: function() {

          var fields = ["question", "answer" , "answA", "answB" , "answC" , "answD"];
          var result = true;

          fields.forEach(field => {
            
            if ( $( "#" + field ).val() == '' ) {

              result = false;
              this.formMessage[field] = "Campo obbligatorio";

            }


          });

          return result;

        },              
  
    },

    filters: {
      truncate(str, len = 100) {

          _.trim(str);

          var div = document.createElement("div");
          div.innerHTML = str.replace(/(<\/p>)/gi, " ");
          var text = div.textContent || div.innerText || "";        

          if ( text.length > len ) {

              return text.substring(0, len) + "...";

          }
          else {

              return text;

          }

        },
    }

});