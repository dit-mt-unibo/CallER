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
        html += "<div class='container-fluid'>";
        html += "<label>Ascolta questo audio: </label>" + "<br/>";
        html += " <iframe width='100%' height='60' src='" + item.audio +"'></iframe>";
        html += "</div>";
      }

      if (item.video) {
        html += "<div class='embed-responsive embed-responsive-16by9 mb-2'>";
        html += "<iframe class='embed-responsive-item' src='" + item.video + "'></iframe>";
        html += "</div>";
      }

      html += "<div class='container mb-2'>";
      html += "<label>Tags: </label>&nbsp;" + item.tags;
      html += "</div>";
      
      // close main container
      // html += "</div>";
      
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;
  }

}

