/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

const rateLimit = require("express-rate-limit");

module.exports.policies = {

  '*': 'is-logged-in',

  // Bypass the 'is-logged-in' policy for:
  'user/logout': true,
  'user/view-login': true,
  'user/login': true,

  // unlock / bypass for reading list and single items, so app work anonymously
  'place/find': true,
  'place/findOne': true,
  'place/render': true,
  'place/related': true,
  'place/search': true,
  'place/search-tag': true,
  'category/find': true,
  'category/render': true, // category has a custom action for findOne, aka GET /category/:id
  'category/navigation-menu': true,
  'quiz/find': true,
  'quiz/findOne': true,
  'glossary/find': true,
  'feedback/create': [rateLimit()], // default setup 1 minute max 5 requests
  'glossary/todays-word': true,
  'glossary/related-content': true,
  'hunt/find': true,
  'hunt/render': true,
  'stage/render': true,
  'player/create': true,
  'player/save': true,
  'player/save-answer': true,
  'player/find': true,

};
