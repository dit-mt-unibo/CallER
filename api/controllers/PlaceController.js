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

  findOne: function (request, response) {
    Place.find(request.params.id).exec(function (error, places) {
      var place = places[0];
      sails.log(place);
      response.view('place', { place });
    });
  },

  updateOne: async (request, response) => {
    var updatedRecord = await Place.updateOne(request.params.id)
      .set(request.body);
    var place = updatedRecord;
    response.view('place', { place });
  },

  create: async (request, response) => {
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
