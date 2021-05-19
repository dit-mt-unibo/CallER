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

  '/place/add': {
    controller: 'PlaceController',
    action: 'prepCreate',
    view: 'pages/places/addplace'
  },
  '/place/list': { 
	controller: 'PlaceController',
  	action: 'lista' 
  },
  'POST /place/update/:id': {
    controller: 'PlaceController',
    action: 'updateOne'
  },

  'POST /place/create': {
    controller: 'PlaceController',
    action: 'create'
  },

  'POST /place/delete/:id': {
    controller: 'PlaceController',
    action: 'delete'
  },
  'GET /place/delete/:id': {
    controller: 'PlaceController',
    action: 'delete'
  },
  'GET /place/edit/:id': {
    controller: 'PlaceController',
    action: 'trovalo'
  },



  // Routes for categories
  'GET /category/list' : {
    action: 'category/view-list',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'GET /category/add': {
    action: 'category/view-create',
    view: 'pages/category/view-create',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'GET /category/edit/:id': {
    action: 'category/view-update',
    locals: {
      layout: 'layouts/newlayout'
    }
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
  '/quiz/list': {
    action: 'quiz/view-list',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'GET /quiz/add': {
    action: 'quiz/view-create',
    view: 'pages/quiz/create',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'POST /quiz/create': {
    action: 'quiz/save'
  },
  'GET /quiz/edit/:id': {
    action: 'quiz/view-update',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'POST /quiz/update/:id': {
    action: 'quiz/save'
  },
  'GET /quiz/delete/:id': {
    action: 'quiz/delete'
  },

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
  'GET /user' : {
    action: 'user/view-list',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'GET /user/add': {
    action: 'user/view-create',
    view: 'pages/user/view-create',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'GET /user/edit/:id': {
    action: 'user/view-update',
    locals: {
      layout: 'layouts/newlayout'
    }
  },
  'POST /user/save': {
    action: 'user/save'
  },
  'GET /user/delete/:id': {
    action: 'user/delete'
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
  'GET /home': {
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

  
  'GET /category/:id': {
    action: 'category/render'
  },
  /*
  'GET /quiz/:id': {
    action: 'quiz/render',
    //view: 'pages/quiz/create',
    locals: {
      layout: 'layouts/app-layout'
    }
  },
  */
};
