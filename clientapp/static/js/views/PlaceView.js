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

function writeBlockedContentHtml(label) {
  var content = "<div class='card border-warning mb-2'>";
  content +=    "    <div class='card-body text-warning'>";
  content +=    "      <h5 class='card-title'>" + label + "</h5>";
  content += "      <span class='card-text'>Contenuto bloccato, rispondi al quiz per vederlo!</span></div></div>";
  return content;
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
    html += "<div><a href='/' data-link><img src='/callerapp/static/images/skyline.png' width='100%'></a></div>";
      
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
      html += "<div class='col titolo'><a class='parentlink' href='" + parent + "' data-link >&lt;</a></div>"
      html += "<div class='col-8 titolo'>" + item.name + "</div>";
      html += "<div class='col titolo'><span class='" + stylesByLevel[item.level] + "'><i class='fas fa-certificate'></i></span></div>";
      html += "</div>";

      html += "<div class='container coords'>";
	  if(item.lat != null && item.lat != 0)
	  {
		  var lat = parseFloat(item.lat).toFixed(5);
		  var lon = 0;
		  if (item.long != null)
			lon = parseFloat(item.long).toFixed(5);
		html += "<p>lat: " + lat + " , long : " + lon + "&nbsp;<i class='fas fa-map-marker-alt'></i></p>";
	  }
	  html += "</div>";
	  
      html += "<div class='container mb-2'>";
      html += item.intro_text;
      html += "</div>";

      html += "<div class='container mb-2'>";
      html += " <img class='img-fluid w-90' src='" + getImageUrl(item.imageUID) + "'></img>";
      html += "</div>";
	  
	  if(item.image_caption != null)
	  {
		  html += "<div class='container coords'>";
		  html += "<p>" + item.image_caption + "</p>";
		  html += "</div>";
	  }
	  
      html += "<div class='container mb-2'>";
      html += item.full_text;
      html += "</div>";
      
      if (item.audio) {
        if (item.audio_block > 0 && content_blocked) {
          html += writeBlockedContentHtml("Audio");
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
          html += writeBlockedContentHtml("Video");
        }
        else {
          html += "<div class='embed-responsive embed-responsive-16by9 mb-2'>";
          html += "<iframe class='embed-responsive-item' src='" + item.video + "'></iframe>";
          html += "</div>";
        }
      }

      if (item.extra_text) {
        if (item.extra_text_block > 0 && content_blocked) {
          html += writeBlockedContentHtml("Testo Bonus");
        }
        else {
          html += "<div class='card border-success mb-2'><div class='card-body'>";
          html += item.extra_text;
          html += "</div></div>";
        }
      }

      // se il quiz è già stato superato, non mostrarlo
      if (item.quiz && content_blocked) {

        var quizId = "quiz" + item.quiz.id;
        
        //html += "<button class='btn btn-primary' type='button' data-toggle='collapse' data-target='#quiz' aria-expanded='false' aria-controls='quiz'>Sblocca altri contenuti!</button>";
        
        html += "<div class='card quiz' id='quiz" + item.quiz.id + "'>";
        html += "<div class='card-header'>Quiz per sbloccare altri contenuti</div>";
        html += "  <div class='card card-body'>";
        html += "    <p>"+ item.quiz.question + "</p>";
        for (let i in item.quiz.choices) {
          // ...add an html radio button
          var choice = encodeURI(item.quiz.choices[i]).replace(/'/g, "%27");
          html += "<label><input type='radio' name='quiz1' value='" + choice + "'> " + item.quiz.choices[i] +"</label>";
        }
        // il bottone submit / rispondi chiama una funzione predefinita, passando la risposta giusta.
        // ovviamente non è una cosa 'bella' da fare perché lato client è tutto visibile,
        // ma qui non si vincono premi e non c'è niente di segreto.
        // Se uno volesse farlo bene, bisognerebbe mandare la risposta dell'utente al server,
        // e avere una API tipo /quiz/id?answer=useranswer che ritorna pass o fail nel body.
        var answer = encodeURI(item.quiz.answer).replace(/'/g, "%27");
        html += "<a href='"+ window.location + "' class='btn btn-info' data-link onclick=verifyAnswer('" + answer + "')>Rispondi</button>";
        html += "  </div>";
        html += "</div>";

        html += "<script>";

        html += "</script>";
      }

      html += "<div class='container mb-2'>";
      html += "<label>Tags: </label>&nbsp;" + item.tags;
      html += "</div>";
      
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;
  }

}

