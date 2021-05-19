import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {

    var html = "<h1>CallER</h1> <div class='container'>";

    var request = new XMLHttpRequest();
    var url = apiUrl + '/category';
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    if (response.status >= 200 && request.status < 400) {
      data.forEach((category) => {
        html += "<div class='card'>";
        html += "<h2>" + category.name + "</h2>";
        html += "<p>" + category.description + "</p>";
        html += "<a class='btn' href='" + u('/categorie/'+ category.id) + "' data-link>Go</a>";
        html += "</div>"; // end card
      })

      html += "</div>";
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }

    return html;

  }

  /* qui vorremmo:
   * <div class="titolo">
  <i class="fab fa-fort-awesome" ></i>CallER
</div>

<div class="container">
  <div class="row">
    <% for(var i = 0; i< items.length; i++){ %>
      <div class="col menu">
        <a href="/category/<%= items[i].id %>">
          <i class="fas fa-user-graduate fa-3x" ></i>
          <br><%= items[i].name %>
        </a>
      </div>

      <% if(i % 2 == 1) { %>
        <div class="w-100"></div>
      <% } %>
    <% } %>
  </div>
</div>
   * 
   * */
  async getHtmlFilms() {

    var html = "<h1>Movies</h1> <div class='container'>";

    var request = new XMLHttpRequest();
    var url = 'https://ghibliapi.herokuapp.com/films';
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    if (response.status >= 200 && request.status < 400) {
      data.forEach((movie) => {
        html += "<div class='card'>";
          
        html += "<h2>" + movie.title + "</h2>";

        html += "<p>" + movie.description.substring(0, 300) + "</p>";
        html += "</div>"; // end card
      })

      html += "</div>";
    } else {
      html += "<marquee>" + "It's not working!" + "</marquee>";
      html += "</div>";
    }
    
    return html;
    
  }
}
