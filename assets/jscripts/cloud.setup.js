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
    "saveCategory": { "verb":"POST", "url":"/admin/category/save" },
    "updateDescription": { "verb": "POST", "url": "/admin/category/description-update"},
    "publishCategory": { "verb": "POST", "url": "/admin/category/publish"},
    "login": { "verb": "POST", "url": "/admin/check-account"},
    "saveUser": { "verb":"POST", "url":"/admin/user/save" },
    "savePlace": { "verb":"POST" , "url":"/admin/place/save" },
    "updateFullText": { "verb":"POST" , "url":"/admin/place/fulltext-update" },
    "updateImage": { "verb":"POST" , "url":"/admin/place/image-update" },
    "updateVideo": { "verb":"POST" , "url":"/admin/place/video-update" },
    "updateAudio": { "verb":"POST" , "url":"/admin/place/audio-update"},
    "publishPlace": { "verb":"POST" , "url":"/admin/place/publish" },
    "saveQuiz": { "verb":"POST" , "url":"/admin/quiz/save" },
    "deleteQuiz": { "verb":"POST" , "url":"/admin/quiz/delete"},
    "saveGlossary": { "verb":"POST", "url":"/admin/glossary/save" },
    "updateGlossaryDefinition": { "verb": "POST", "url": "/admin/glossary/definition-update" },
    "updateGlossaryAudio": { "verb": "POST", "url": "/admin/glossary/audio-update" },
    "updateGlossaryImage": { "verb": "POST", "url": "/admin/glossary/image-update" },
    "updateStageImage": { "verb": "POST", "url": "/admin/stage/image-update" },
    "saveHunt": { "verb":"POST" , "url":"/admin/hunt/save" },
    "saveStage": { "verb": "POST", "url": "/admin/stage/save" },
    "saveAbgame": { "verb": "POST", "url": "/admin/abgame/save" },
    "saveAbquestion": { "verb": "POST", "url": "/admin/abquestion/save" },
  }
  /* eslint-enable */

});
