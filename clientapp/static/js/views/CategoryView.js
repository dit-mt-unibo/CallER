import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.categoryID = params.id;
    this.setTitle('Una Categoria');
  }

  async getHtml() {

    var html = "<div class='container'>";

    var url = apiUrl + '/category/' + this.categoryID;
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    if (response.status >= 200 && response.status < 400) {
      
      html += "<div class='titolo'>" + data.item.name + "</div>";
      html += "<div class='container'>" + data.item.description + "</div><span>&nbsp;</span>";

      // child categories
      html += "<div class='container'>";
      data.childrenCategories.forEach((childCat) => {
        html += "<div class='card card-inverse mb-3 text-center' style='background-color: blue; border-color: #333;'>";
        html += "<div class='card-block'>";
        html += "<a class='card-title' href='" + u('/categorie/' + childCat.id)  + "' data-link>" + childCat.name + "</a>";
        html += "</div></div>";
      })
      html += "</div>";

      // child places
      html += "<div class='container'>";
      data.childrenPlaces.forEach((childPlace) => {
        html += "<div class='card text-center' style='color: green; background-color: white; border-color: green;'>";
        html += "<div class='card-block'>";
        html += "<a class='card-title' href='" + u('/contenuti/' + childPlace.id) + "' data-link>" + childPlace.name + "</a>";
        html += "</div></div>";
      })
      html += "</div>";

      // close main container
      html += "</div>";

    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;

    /*
    return `
        <h1>Post</h1>
        <p>You are viewing post #${this.postID}. No content can be shown here yet.</p>
    `;
    */

  }
}
