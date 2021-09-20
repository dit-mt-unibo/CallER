import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.categoryID = params.id;
    this.setTitle('Una Categoria');
  }

  async getHtml() {

    var stylesByLevel = [
      "badge badge-success",
      "badge badge-warning",
      "badge badge-danger"
    ];
    var html = ""; //<div class='container'>";

    var url = apiUrl() + '/category/' + this.categoryID;
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    if (response.status >= 200 && response.status < 400) {

      var parent = data.item.parent_id
      if (parent == null) {
        parent = '/';
      } else {
        parent = u('/categorie/' + data.item.parent_id);
      }

	  html += "<div><a href='/' data-link><img src='/callerapp/static/images/skyline.png' width='100%'></div>";
      html += "<div class='container'><div class='row bg-light'>";
      html += "<div class='col titolo'><a class='parentlink' href='" + parent + "' data-link >&lt;</a></div>"
      html += "<div class='col-8 titolo'>" + data.item.name + "</div><div class='col'>&nbsp;</div>";
      html += "</div>";
      // html += "<div class='titolo'>" + data.item.name + "</div>";
      html += "<div class='container'><span>&nbsp;</span>" + data.item.description + "</div><span>&nbsp;</span>";

      // child categories
      html += "<div class='container'>";
      data.childrenCategories.forEach((childCat) => {
        html += "<div class='card text-center bg-success' style='margin-bottom: 4px;'>";
        html += "<div class='card-block'>";
        html += "<a class='text-white font-weight-bold' href='" + u('/categorie/' + childCat.id)  + "' data-link>" + childCat.name + "</a>";
        html += "</div></div>";
      })
      html += "</div>";

      // child places
      html += "<div class='container'>";
      data.childrenPlaces.forEach((childPlace) => {
        html += "<div class='card p-1 text-success' >";
        html += "<div class='card-block'>";
        html += "<span class='" + stylesByLevel[childPlace.level] + "'>&nbsp;</span>&nbsp;";
        html += "<a class='text-success font-weight-bold' href='" + u('/contenuti/' + childPlace.id) + "' data-link>" + childPlace.name + "</a>";
        html += "</div></div>";
      })
      html += "</div>";
      
      // close main container
      //html += "</div>";

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
