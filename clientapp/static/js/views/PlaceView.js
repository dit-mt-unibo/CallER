import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

function getImageUrl(imageName) {
  return apiUrl() + "/images/contenuti/" + imageName;
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.placeID = params.id;
    this.setTitle('Un Contenuto');
  }

  async getHtml() {

    var stylesByLevel = [
      "text-success",
      "text-warning",
      "text-danger"
    ];

    var html = ""; //"<div class='container'>";
    
    var url = apiUrl() + '/place/' + this.placeID;
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    if (response.status >= 200 && response.status < 400) {

      var item = data.item;
      var parent = u('/categorie/' + item.category_id);

      var content_blocked = true;
      if (item.quiz) {
        var quizId = "quiz" + item.quiz.id;
        var unblocked = getCookie(quizId);
        if (unblocked > "") {
          content_blocked = false;
        }
      }

      html += "<div class='modal fade' id='defModal' role='dialog'>";
      html += "    <div class='modal-dialog'>";
      html += "      <div class='modal-content'>";
      html += "        <div class='modal-header'>";
      html += "          <h4 class='modal-title'>Definizione</h4>";
      html += "          <button type='button' class='close' data-dismiss='modal'>&times;</button>";
      html += "        </div>";
      html += "        <div class='modal-body'></div>";
      html += "      </div>";
      html += "    </div>";
      html += "</div>";

      html += "<div class='container'><div class='row bg-light'>";
      html += "<div class='col titolo'><a href='" + parent + "' data-link >&lt;</a></div>"
      html += "<div class='col-8 titolo'>" + item.name + "</div>";
      html += "<div class='col titolo'><span class='" + stylesByLevel[item.level] + "'><i class='fas fa-certificate'></i></span></div>";
      html += "</div>";

      html += "<div class='container coords'>";
      html += "<p>lat: " + item.lat + " , long : " + item.long + "&nbsp;<i class='fas fa-map-marker-alt'></i></p>";
      html += "</div>";

      html += "<div class='container mb-2'>";
      html += item.intro_text;
      html += "</div>";

      html += "<div class='container mb-2'>";
      html += " <img class='img-fluid w-90' src='" + getImageUrl(item.imageUID) + "'></img>";
      html += "</div>";

      html += "<div class='container mb-2'>";
      html += item.full_text;
      html += "</div>";
      
      if (item.audio) {
        if (item.audio_block > 0 && content_blocked) {
          html += "<div class='content-blocked'>Contenuto bloccato, supera il quiz per vederlo!</div>";
        }
        else {
          html += "<div class='container-fluid'>";
          html += "<label>Ascolta questo audio: </label>" + "<br/>";
          html += " <iframe width='100%' height='60' src='" + item.audio + "'></iframe>";
          html += "</div>";
        }
      }

      if (item.video) {
        if (item.video_block > 0 && content_blocked) {
          html += "<div class='content-blocked'>Contenuto bloccato, supera il quiz per vederlo!</div>";
        }
        else {
          html += "<div class='embed-responsive embed-responsive-16by9 mb-2'>";
          html += "<iframe class='embed-responsive-item' src='" + item.video + "'></iframe>";
          html += "</div>";
        }
      }

      if (item.extra_text) {
        if (item.extra_text_block > 0 && content_blocked) {
          html += "<div class='content-blocked'>Contenuto bloccato, supera il quiz per vederlo!</div>";
        }
        else {
          html += "<div class='container mb-2'>";
          html += item.extra_text;
          html += "</div>";
        }
      }

      html += "<div class='container mb-2'>";
      html += "<label>Tags: </label>&nbsp;" + item.tags;
      html += "</div>";

      // se il quiz è già stato superato, non mostrarlo
      if (item.quiz && content_blocked) {

        var quizId = "quiz" + item.quiz.id;
        
        //html += "<button class='btn btn-primary' type='button' data-toggle='collapse' data-target='#quiz' aria-expanded='false' aria-controls='quiz'>Sblocca altri contenuti!</button>";
        html += "Sblocca altri contenuti!<br>";
        /*
         * "question": "In quale regione si trova Forlì?",
      "choices": [
        "Piemonte",
        "Sicilia",
        "Emilia-Romagna",
        "Non lo so"
      ],
      "answer": "Emilia-Romagna",
         * */
        html += "<div class='card quiz' id='quiz"+ item.quiz.id +"'>";
        html += "  <div class='card card-body'>";
        html += "    <p>"+ item.quiz.question + "</p>";
        for (let i in item.quiz.choices) {
          // ...add an html radio button
          html += "<label><input type='radio' name='quiz1' value='" + item.quiz.choices[i] + "'> " + item.quiz.choices[i] +"</label>";
        }
        // il bottone submit / rispondi chiama una funzione predefinita, passando la risposta giusta.
        // ovviamente non è una cosa 'bella' da fare perché lato client è tutto visibile,
        // ma qui non si vincono premi e non c'è niente di segreto.
        // Se uno volesse farlo bene, bisognerebbe mandare la risposta dell'utente al server,
        // e avere una API tipo /quiz/id?answer=useranswer che ritorna pass o fail nel body.
        html += "<button type='button' class='btn btn-info' onclick=verifyAnswer('" + item.quiz.answer + "')>Rispondi</button>";
        html += "  </div>";
        html += "</div>";

        html += "<script>";

        html += "</script>";
      }

      // close main container
      // html += "</div>";
      
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;
  }

}

