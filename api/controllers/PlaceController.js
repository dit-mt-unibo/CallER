/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Place = require("../models/Place");

module.exports = {

  // this is used by client app only. It should be moved to its own action
  /*
  render: async (request, response) => {
    try {
      let place = await Place.findOne(request.params.id);
      if (!place) {
        return response.notFound('The place was NOT found!');
      }
      response.view('pages/clientapp/place', { item : place });
    } catch (err) {
      response.serverError(err);
    }
  },
  */

  lista: async (request, response) => {
    Place.find({}).exec(function (err, data) {
      if (err) {
        sails.log('Error summary: ' + err);
        sails.log(err);
        return res.send(500, { error: 'Database Error' }); // note the return!
      }
      response.view('pages/places/places', { data: data });
    });
  },

  trovalo: async (request, response) => {
    var place = await Place.findOne(request.params.id);
    sails.log(place);
    try {

      categories = await Category.find({
        sort: 'id ASC'
      });

    }
    catch (err) {
      //
    }
    response.view('pages/places/place', { place , categories });
  },

  updateOne: async (request, response) => {
    var params = request.allParams();
    if ((params.image == null) || (params.image == "")) {
      sails.log("image=" + params.image + ", image_old=" + params.image_old);
      request.body.image = request.body.image_old;
      var updatedData = await Place.updateOne(request.params.id).set(request.body);
      sails.log(updatedData);
      response.redirect('/place/list');
      return;
    }

    sails.log("Params: image=" + params.image + ", video="+params.video);

    request.file('image').upload({
      dirname: '../../assets/images/contenuti',
      maxBytes: 10000000 // limit to 10 Mb
    }, function (err, uploadedFile) {
      if (err) {
        return response.serverError(err);
      }
      sails.log(uploadedFile);

      if (uploadedFile.length === 0)
      {
        sails.log('Contenuto non creato!');
        return response.redirect('/');
      }

      var fileName = uploadedFile[0].filename;
      var fileUID = uploadedFile[0].fd.replace(/^.*[\\\/]/, '');

      sails.log("filename: " + fileName + " UID: " + fileUID);
      request.body.image = fileName;
      request.body.imageUID = fileUID;

      // sails.log("FATTO: filename: " + request.body.image + " UID: " + request.body.imageUID);
      Place.updateOne(request.params.id).set(request.body).exec((err, createdData) => {
        if (err) {
          return response.badRequest({
            error: err
          });
        } else {
          // return response.view('/place', { place: createdData });
          sails.log("Updated Place: " + createdData);
          sails.log("UPDATED Image :" + createdData.image)
          response.redirect('/place/list');
        }
      });

    });
     
  },

  create: function (request, response){
    var params = request.allParams();
    request.file('image').upload({
      dirname: '../../assets/images/contenuti',
      maxBytes: 10000000
    }, function (err, uploadedFile) {
      if (err) {
        return response.serverError(err);
      }
      console.log(uploadedFile);

      if (uploadedFile.length === 0) {
        return response.redirect('/');
        return sails.log('Contenuto non creato!');
      }

      var fileName = uploadedFile[0].filename;
      var fileUID = uploadedFile[0].fd.replace(/^.*[\\\/]/, '');

      request.body.image = uploadedFile[0].filename;
      request.body.imageUID = fileUID;

        Place.create(request.body, function(err, createdData) {
        if (err) {
          return response.badRequest({
            error: err
          });
        } else {
          // return response.view('/place', { place: createdData });
          response.redirect('/place/list');
        }
      });
      //response.redirect('/place');
    });
  },

  createOld: async (request, response) => {
    var place = await Place.create(request.body).fetch();
    response.redirect('/place/list');
  },


  delete: async (request, response) => {
    var deleted = await Place.destroyOne(request.params.id);
    if (deleted) {
      sails.log('Deleted place with id: ' + request.params.id);
    } else {
      sails.log('The database does not have a Place with id: ' + request.params.id);
    }
    response.redirect('/place/list');
  },

  prepCreate: async (request, response) => {
    categories = await Category.find({
      where: { parent_id: null },
      sort: 'name ASC'
    });
    response.view('pages/places/addplace', { categories });
  },


};
