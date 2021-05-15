/**
 * cloud.setup.js
 *
 * Configuration for this Sails app's generated browser SDK ("Cloud").
 *
 * Above all, the purpose of this file is to provide endpoint definitions,
 * each of which corresponds with one particular route+action on the server.
 *
 * > This file was automatically generated.
 * > (To regenerate, run `sails run rebuild-cloud-sdk`)
 */

Cloud.setup({

  /* eslint-disable */
  methods: {
    "save": { "verb":"POST", "url":"/category/save" },
    "updatedescription": { "verb": "POST", "url": "/category/description-update"},
    "publishcategory": { "verb": "POST", "url": "/category/publish"}
  }
  /* eslint-enable */

});
