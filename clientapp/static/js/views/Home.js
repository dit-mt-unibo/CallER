import AbstractView from './AbstractView.js';
import { u, apiUrl } from '../lib.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Home');
  }

  async getHtml() {

    var html = ""; //<div class='titolo'>ForliviAMO</div>";  // <i class='fab fa-fort-awesome' ></i>
	html+= "<div id='logo'><img class='logo' src='/static/images/logos.png' alt='logo' /></div>";
	html+= "<div id='spacing'><span /></div>";
    html +="<div class='container' style='vertical-align: middle'>";

    var request = new XMLHttpRequest();
    var url = apiUrl() + '/category';
    var response = await fetch(url);
    // Begin accessing JSON data here
    var data = await response.json();
    var count = 0;

    if (response.status >= 200 && response.status < 400) {

      // tabella con 2 icone su ogni riga (ma utilizzando una singola row entity..)
      html += "<div class='row'>";

      data.forEach((category) => {

        if ((category.id != 1) && (category.parent_id == null)) {
          html += "<div class='col menu'>";
          html += " <a class='btn' href='" + u('/categorie/' + category.id) + "' data-link>";
          if (category.icon == null || category.icon == "")
            category.icon = "info";
          html += "   <i class='fas fa-" + category.icon + " fa-2x home' ></i>";
          html += "   <p class='home'>" + category.name + "</p>";
          html += " </a>";
          html += "</div>"; // end card
          count++;
          if (count % 2 == 0) // ogni due icone inserisci un div
            html += "<div class='w-100'></div>";
        }
      });
      html += "</div>"; // close row
      html += "</div>"; // close container

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
  <div class='row'>
    <% for(var i = 0; i< items.length; i++){ %>
      <div class="col menu">
        <a href="/category/<%= items[i].id %>">
          <i class='fas fa-user-graduate fa-3x' ></i>
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
