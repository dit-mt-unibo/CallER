import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

function getImageUrl(imageName) {
  return apiUrl() + "/images/contenuti/" + imageName;
}

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.placeID = params.id;
    this.setTitle('Un Contenuto');
  }

  async getHtml() {

    var html = ""; //"<div class='container'>";
    
    var url = apiUrl() + '/place/' + this.placeID;
    var response = await fetch(url);
    // Begin accessing JSON data here
    var item = await response.json();
    if (response.status >= 200 && response.status < 400) {

      html += "<div class='titolo'>" + item.name + "</div>";
      //html += "<div class='container'>";
      html += " <img class='img-fluid w-90' src='" + getImageUrl(item.imageUID) + "'></img>";
      //html += "</div>";

      html += "<hr></hr>";

      html += "<div class='container'>";
      html += item.intro_text;
      html += "</div>";

      html += "<hr></hr>";

      html += "<div class='container'>";
      html += "<label>Posizione (coordinate)</label>lat: " + item.lat + " , long : " + item.long;
      html += "</div>";

      html += "<hr></hr>";

      html += "<div class='container'>";
      html += item.full_text;
      html += "</div>";

      html += "<hr></hr>";

      if (item.audio) {
        html += "<div class='container-fluid'>";
        html += "<label>Ascolta questo audio: </label>" + "<br/>";
        html += " <iframe width='100%' height='60' src='" + item.audio +"'></iframe>";
        html += "</div>";
      }
      html += "<hr></hr>";

      if (item.video) {
        html += "<div class='embed-responsive embed-responsive-16by9'>";
        html += "<iframe class='embed-responsive-item' src='" + item.video + "'></iframe>";
        html += "</div>";
      }

      html += "<hr></hr>";
      html += "<div class='container'>";
      html += "<label>Tags: </label>&nbsp;" + item.tags;
      html += "</div>";
      html += "<hr></hr>";
      html += "<div class='mx-auto text-center'><a class='btn btn-primary' href='" + u('/categorie/' + item.category_id) + "' data-link>Altri contenuti</a></div>";
      
      // close main container
      // html += "</div>";
      
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;
  }

}

