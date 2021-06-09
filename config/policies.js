/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  //'*': 'is-logged-in',

  // Bypass the 'is-logged-in' policy for:  
  'user/logout': true,
  'user/view-login': true,
  'user/login': true,

  // unlock / bypass for reading list and single items, so app work anonymously 
  'place/find': true,
  'place/findOne': true,
  'category/find': true,
  'category/render': true, // category has a custom action for findOne, aka GET /category/:id
  'quiz/find': true,
  'quiz/findOne': true,


};
