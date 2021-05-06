/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  /*
   
   sails.log('Hello, world, about to create places..');
    
  await Place.createEach([
    {
      name : 'Piazza Saffi',
      intro_text: 'La piazza principale di Forlì',
full_text: 'La piazza principale di Forlì, bla bla bla',
      gps: '{geolocation {lat: 44.2225 , lng: 12.041111}}',
      category_id: 1,
//	image: 'foobar.jpg',
      image: 'https://www.forlipedia.it/site/wp-content/uploads/2020/02/piazza-saffi-faceb.jpg',
    },
       {
      name : 'Palazzo Piazza Paulucci',
      intro_text: 'un edificio storico della città di Forlì che occupa tutto un lato di Piazza Ordelaffi',
      full_text: 'un edificio storico della città di Forlì che occupa tutto un lato di Piazza Ordelaffi, bla bla bla',
      gps: '{geolocation {lat: 44.1327 , lng: 12.021921}}',
      category_id: 1,
 image: 'foo.jpg',
    },
      {
      name : 'Porta Schiavonia',
      intro_text: 'Porta Schiavonìa è l\'unica porta rimasta della cinta muraria di Forlì.',
full_text: 'Porta Schiavonìa è l\'unica porta rimasta della cinta muraria di Forlì. bla bla bla...',
      gps: '{geolocation {lat: 44.1327 , lng: 12.021921}}',
      category_id: 1,
 image: 'foo.jpg',
    },
  ]);

  */

};
