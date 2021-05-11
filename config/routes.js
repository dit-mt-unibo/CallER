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

  '/': { view: 'pages/homepage' },
  '/add': {
    controller: 'PlaceController',
    action: 'prepCreate',
    view: 'addplace'
  },
  '/place': { 
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



  // Routes for categories
  'GET /category' : {
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

};
