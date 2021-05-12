/**
 * PlaceController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


  render: async (request, response) => {
    try {
      let place = await Place.findOne({
        id: 1
      });
      if (!place) {
        return response.notFound('The place was NOT found!');
      }
      response.view('place', { place });
    } catch (err) {
      response.serverError(err);
    }
  },

  lista: async (request, response) => {
    Place.find({}).exec(function (err, data) {
      if (err) {
        sails.log('Error summary: ' + err);
        sails.log(err);
        return res.send(500, { error: 'Database Error' }); // note the return!
      }
      response.view('pages/places', { data: data });
    });
  },

  findOne: async (request, response) => {
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
    response.view('place', { place , categories });
  },

  updateOne: function (request, response) {
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

        var updatedRecord = Place.updateOne(request.params.id).set(request.body);

        if (!updatedRecord) {
          return response.badRequest();
        } else {
          sails.log("Update Place received: " + updatedRecord.id + " imageUID: " + updatedRecord.imageUID + " image name: " +
            updatedRecord.image);
          // return response.view('/place', { place: createdData });
          response.redirect('/place');
        }


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
          response.redirect('/place');
        }
      });
      //response.redirect('/place');
    });
  },

  createOld: async (request, response) => {
    var place = await Place.create(request.body).fetch();
    response.redirect('/place');
  },


  delete: async (request, response) => {
    var deleted = await Place.destroyOne(request.params.id);
    if (deleted) {
      sails.log('Deleted place with id: ' + request.params.id);
    } else {
      sails.log('The database does not have a Place with id: ' + request.params.id);
    }
    response.redirect('/place');
  },

  prepCreate: async (request, response) => {
    categories = await Category.find({
      where: { parent_id: null },
      sort: 'name ASC'
    });
    response.view('addplace', { categories });
  },


};
