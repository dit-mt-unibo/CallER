/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { 
    action: 'homepage'
  },

  // Routes for places
  'GET /place/list': {    
    action: 'place/view-list'
  },
  'GET /place/add': {
    action: 'place/view-create'
  },
  'GET /place/edit/:id': {    
    action: 'place/view-update'
  },
  'GET /place/details/:id': {
    action: 'place/view-details'
  },
  'POST /place/save': {    
    action: 'place/save'
  },
  'GET /place/delete/:id': {    
    action: 'place/delete'
  },
  'POST /place/publish/': {    
    action: 'place/publish'
  },
  'POST /place/fulltext-update': {
    action: 'place/fulltext-update'
  },
  'POST /place/image-update': {
    action: 'place/image-update'
  },
  'POST /place/video-update': {
    action: 'place/video-update'
  },
  'POST /place/audio-update': {
    action: 'place/audio-update'
  },  



  // Routes for categories
  'GET /category/list' : {
    action: 'category/view-list'
  },
  'GET /category/add': {
    action: 'category/view-create',
    view: 'pages/category/view-create'
  },
  'GET /category/edit/:id': {
    action: 'category/view-update'
  },
  'POST /category/save': {
    action: 'category/save'
  },
  'GET /category/delete/:id': {
    action: 'category/delete'
  },
  'POST /category/description-update': {
    action: 'category/description-update'
  },
  'POST /category/publish': {
    action: 'category/publish'
  },

  // Routes for quiz
  'POST /quiz/save' : {
    action: 'quiz/save'
  },
  'POST /quiz/delete': {
    action: 'quiz/delete'
  },

  // Potrebbero tornare utili in futuro
  /*'/quiz/list': {
    action: 'quiz/view-list'
  },
  'GET /quiz/add': {
    action: 'quiz/view-create',
    view: 'pages/quiz/create'
  },
  'POST /quiz/create': {
    action: 'quiz/save'
  },
  'GET /quiz/edit/:id': {
    action: 'quiz/view-update'
  },
  'POST /quiz/update/:id': {
    action: 'quiz/save'
  },
  'GET /quiz/delete/:id': {
    action: 'quiz/delete'
  },*/

  // Routes for user
  '/login': {
    action: 'user/view-login',
    view: 'pages/user/view-login',
    locals: {
      layout: 'layouts/guest'
    }
  },
  '/logout': {
    action: 'user/logout'
  },
  'POST /check-account': {
    action: 'user/login'
  },
  'GET /user/list' : {
    action: 'user/view-list'
  },
  'GET /user/add': {
    action: 'user/view-create',
    view: 'pages/user/view-create'
  },
  'GET /user/edit/:id': {
    action: 'user/view-update'
  },
  'POST /user/save': {
    action: 'user/save'
  },
  'GET /user/delete/:id': {
    action: 'user/delete'
  },

  // Routes for glossary
  'GET /glossary/list' : {
    action: 'glossary/view-list'
  },
  'GET /glossary/add': {
    action: 'glossary/view-create',
    view: 'pages/glossary/view-create'
  },
  'GET /glossary/edit/:id': {
    action: 'glossary/view-update'
  },
  'GET /glossary/details/:id' :{
    action: 'glossary/view-details'
  },
  'POST /glossary/save': {
    action: 'glossary/save'
  },
  'GET /glossary/delete/:id': {
    action: 'glossary/delete'
  },
  'POST /glossary/definition-update': {
    action: 'glossary/definition-update'
  },
  'POST /glossary/definition-update': {
    action: 'glossary/definition-update'
  },
  'POST /glossary/image-update': {
    action: 'glossary/image-update'
  },
  'POST /glossary/audio-update': {
    action: 'glossary/audio-update'
  },

  // Routes for feedback
  'GET /feedback/list' : {
    action: 'feedback/view-list'
  },



  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // routes per la client app
  // questa è necessaria perché restituisce un json con
    // category
    // childCategories : le categorie collegate (se esistono)
    // childPlaces: i contenuti di questa category (se esistono)
  'GET /api/category': {
      action: 'category/find'
  },
    'GET /api/category/:id': {
    action: 'category/render'
  },
  // aggiungi quiz all'oggetto place:
  'GET /api/place/:id': {
    action: 'place/render'
  },
  'GET /api/place-related/:id/:cat_id': {
    action: 'place/related'
  },
  'POST /api/feedback': {
    action: 'feedback/create',
    csrf: false
  },
  'GET /api/search': {
    action: 'place/search'
  },
  'GET /api/search-tag': {
    action: 'place/search-tag'
  },
  'GET /api/get-navigation-menu': {
    action: 'category/navigation-menu'
  },
  'GET /api/get-todays-word': {
    action: 'glossary/todays-word'
  },
  'GET /api/get-glossary-related-content': {
    action: 'glossary/related-content'
  },
  'GET /api/glossary': {
    action: 'glossary/find'
  },
  /*
   * 'GET /home': {
    action: 'category/sublist',
    // view: 'pages/clientapp/home',
    locals: {
      layout: 'layouts/app-layout'
    }
  },

  'GET /place/sublist:id': {
    action: 'place/sublist',
    view: 'pages/clientapp/category',
    locals: {
      layout: 'layouts/app-layout'
    }
  },
  'GET /place/:id': {
    controller: 'PlaceController',
    action: 'render',
   // view: 'pages/clientapp/home',
    locals: {
      layout: 'layouts/app-layout'
    }
  },

 
  'GET /quiz/:id': {
    action: 'quiz/render',
    //view: 'pages/quiz/create',
    locals: {
      layout: 'layouts/app-layout'
    }
  },
  */
};
