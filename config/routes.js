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

  '/admin': {
    action: 'homepage'
  },

  // Routes for places
  'GET /admin/place/list': {
    action: 'place/view-list'
  },
  'GET /admin/place/add': {
    action: 'place/view-create'
  },
  'GET /admin/place/edit/:id': {
    action: 'place/view-update'
  },
  'GET /admin/place/details/:id': {
    action: 'place/view-details'
  },
  'POST /admin/place/save': {
    action: 'place/save'
  },
  'GET /admin/place/delete/:id': {
    action: 'place/delete'
  },
  'POST /admin/place/publish/': {
    action: 'place/publish'
  },
  'POST /admin/place/fulltext-update': {
    action: 'place/fulltext-update'
  },
  'POST /admin/place/image-update': {
    action: 'place/image-update'
  },
  'POST /admin/place/video-update': {
    action: 'place/video-update'
  },
  'POST /admin/place/audio-update': {
    action: 'place/audio-update'
  },



  // Routes for categories
  'GET /admin/category/list' : {
    action: 'category/view-list'
  },
  'GET /admin/category/add': {
    action: 'category/view-create',
    view: 'pages/category/view-create'
  },
  'GET /admin/category/edit/:id': {
    action: 'category/view-update'
  },
  'POST /admin/category/save': {
    action: 'category/save'
  },
  'GET /admin/category/delete/:id': {
    action: 'category/delete'
  },
  'POST /admin/category/description-update': {
    action: 'category/description-update'
  },
  'POST /admin/category/publish': {
    action: 'category/publish'
  },

  // Routes for quiz
  'POST /admin/quiz/save' : {
    action: 'quiz/save'
  },
  'POST /admin/quiz/delete': {
    action: 'quiz/delete'
  },


  // Routes for hunt (caccia al tesoro)
  'GET /admin/hunt/list' : {
    action: 'hunt/view-list'
  },
  'GET /admin/hunt/add': {
    action: 'hunt/view-create',
    view: 'pages/hunt/view-create'
  },
  'GET /admin/hunt/edit/:id': {
    action: 'hunt/view-update'
  },
  'POST /admin/hunt/save': {
    action: 'hunt/save'
  },
  'GET /admin/hunt/delete/:id': {
    action: 'hunt/delete'
  },

  // Routes for stages
  'GET /admin/stage/list' : {
    action: 'stage/view-list'
  },
  'GET /admin/stage/add': {
    action: 'stage/view-create'
  },
  'GET /admin/stage/edit/:id': {
    action: 'stage/view-update'
  },
  'GET /admin/stage/details/:id': {
    action: 'stage/view-details'
  },
  'POST /admin/stage/save': {
    action: 'stage/save'
  },
  'GET /admin/stage/delete/:id': {
    action: 'stage/delete'
  },
  'POST /admin/stage/fulltext-update': {
    action: 'stage/fulltext-update'
  },
  'POST /admin/stage/image-update': {
    action: 'stage/image-update'
  },

  // Routes for abgame (Gioco A/B)
  'GET /admin/abgame/list': {
    action: 'abgame/view-list'
  },
  'GET /admin/abgame/add': {
    action: 'abgame/view-create',
    view: 'pages/habgameunt/view-create'
  },
  'GET /admin/abgame/edit/:id': {
    action: 'abgame/view-update'
  },
  'POST /admin/abgame/save': {
    action: 'abgame/save'
  },
  'GET /admin/abgame/delete/:id': {
    action: 'abgame/delete'
  },

  // Routes for questions (A/B game)
  'GET /admin/abquestion/list': {
    action: 'abquestion/view-list'
  },
  'GET /admin/abquestion/add': {
    action: 'abquestion/view-create'
  },
  'GET /admin/abquestion/edit/:id': {
    action: 'abquestion/view-update'
  },
  'GET /admin/abquestion/details/:id': {
    action: 'abquestion/view-details'
  },
  'POST /admin/abquestion/save': {
    action: 'abquestion/save'
  },
  'GET /admin/abquestion/delete/:id': {
    action: 'abquestion/delete'
  },
  'POST /admin/abquestion/fulltext-update': {
    action: 'abquestion/fulltext-update'
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
  '/admin/login': {
    action: 'user/view-login',
    view: 'pages/user/view-login',
    locals: {
      layout: 'layouts/guest'
    }
  },
  '/admin/logout': {
    action: 'user/logout'
  },
  'POST /admin/check-account': {
    action: 'user/login'
  },
  'GET /admin/user/list' : {
    action: 'user/view-list'
  },
  'GET /admin/user/add': {
    action: 'user/view-create',
    view: 'pages/user/view-create'
  },
  'GET /admin/user/edit/:id': {
    action: 'user/view-update'
  },
  'POST /admin/user/save': {
    action: 'user/save'
  },
  'GET /admin/user/delete/:id': {
    action: 'user/delete'
  },

  // Routes for glossary
  'GET /admin/glossary/list' : {
    action: 'glossary/view-list'
  },
  'GET /admin/glossary/add': {
    action: 'glossary/view-create',
    view: 'pages/glossary/view-create'
  },
  'GET /admin/glossary/edit/:id': {
    action: 'glossary/view-update'
  },
  'GET /admin/glossary/details/:id' :{
    action: 'glossary/view-details'
  },
  'POST /admin/glossary/save': {
    action: 'glossary/save'
  },
  'GET /admin/glossary/delete/:id': {
    action: 'glossary/delete'
  },
  'POST /admin/glossary/definition-update': {
    action: 'glossary/definition-update'
  },
  'POST /admin/glossary/definition-update': {
    action: 'glossary/definition-update'
  },
  'POST /admin/glossary/image-update': {
    action: 'glossary/image-update'
  },
  'POST /admin/glossary/audio-update': {
    action: 'glossary/audio-update'
  },

  // Routes for feedback
  'GET /admin/feedback/list' : {
    action: 'feedback/view-list'
  },

  // Routes for player
  'GET /admin/player/list' : {
    action: 'player/view-list'
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

  // routes per il client app
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

  // Caccia al tesoro
  'GET /api/get-hunt-id': {
    action: 'hunt/find'
  },  
  'GET /api/hunt': {
    action: 'hunt/render'
  },
  'POST /api/player/create': {
    action: 'player/create',
    csrf: false
  },
  'POST /api/player/save-answer': {
    action: 'player/save-answer',
    csrf: false
  },
  'GET /api/player/find': {
    action: 'player/find'
  },
  'GET /api/stage': {
    action: 'stage/render'
  },
  
};
