import Home from './views/Home.js';
import Categories from './views/Categories.js';
import CategoryView from './views/CategoryView.js';
import PlaceView from './views/PlaceView.js';
import Settings from './views/Settings.js';
import { u, apiUrl } from './lib.js';

const pathToRegex = path =>
  new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

  return Object.fromEntries(
    keys.map((key, i) => {
      return [
        key,
        values[i]
      ];
    })
  );
};

const navigateTo = url => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: u('/'), view: Home },
    { path: u('/categorie'), view: Categories },
    { path: u('/categorie/:id'), view: CategoryView },
    { path: u('/contenuti/:id'), view: PlaceView },
    { path: u('/settings'), view: Settings }
  ];

  // Test each route for potential match
  const potentialMatches = routes.map(route => {
    return {
      route: route,
      result: location.pathname.match(pathToRegex(route.path))
    };
  });

  let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

  if (!match) {
    match = {
      route: routes[0],
      result: [
        location.pathname
      ]
    };
  }

  const view = new match.route.view(getParams(match));

  document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', e => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    else if (e.target.matches('[glossary-link]')) {
      e.preventDefault();
      var glossaryUrl = apiUrl() + '/glossary?name=' + e.target.target;

      // AJAX request
      $.ajax({
        url: glossaryUrl,
        type: 'get',
        success: function (response) {
          var definition = response[0];
          $('.modal-title').text(definition['term']);
          // Add response in Modal body
          $('.modal-body').html(definition['definition']);

          // Display Modal
          $('#defModal').modal('show');
        }
      });

    }
    else if (e.target.parentNode.matches('a')) {
      e.preventDefault();
      navigateTo(e.target.parentNode.href);
    }
    else if (e.target.matches('a')) {
      e.preventDefault();
      if (e.target.target == 'glossary') {
        var glossaryUrl = apiUrl() + '/glossary?name=' + e.target.title;

        // AJAX request
        $.ajax({
          url: glossaryUrl,
          type: 'get',
          success: function (response) {
            var definition = response[0];
            $('.modal-title').text(definition['term']);
            // Add response in Modal body
            $('.modal-body').html(definition['definition']);
            // Display Modal
            $('#defModal').modal('show');
          }
        });
      }
    }
    else {
        navigateTo(e.target.parentNode.href);
    }
      
  });

  router();
});
