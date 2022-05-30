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
    "saveCategory": { "verb":"POST", "url":"/category/save" },
    "updateDescription": { "verb": "POST", "url": "/category/description-update"},
    "publishCategory": { "verb": "POST", "url": "/category/publish"},
    "login": { "verb": "POST", "url": "/check-account"},
    "saveUser": { "verb":"POST", "url":"/user/save" },
    "savePlace": { "verb":"POST" , "url":"/place/save" },
    "updateFullText": { "verb":"POST" , "url":"/place/fulltext-update" },
    "updateImage": { "verb":"POST" , "url":"/place/image-update" },
    "updateVideo": { "verb":"POST" , "url":"/place/video-update" },
    "updateAudio": { "verb":"POST" , "url":"/place/audio-update"},
    "publishPlace": { "verb":"POST" , "url":"/place/publish" },
    "saveQuiz": { "verb":"POST" , "url":"/quiz/save" },
    "deleteQuiz": { "verb":"POST" , "url":"/quiz/delete"},
    "saveGlossary": { "verb":"POST", "url":"/glossary/save" },
    "updateGlossaryDefinition": { "verb": "POST", "url": "/glossary/definition-update" },
    "updateGlossaryAudio": { "verb": "POST", "url": "/glossary/audio-update" },
    "updateGlossaryImage": { "verb": "POST", "url": "/glossary/image-update" },
  }
  /* eslint-enable */

});
