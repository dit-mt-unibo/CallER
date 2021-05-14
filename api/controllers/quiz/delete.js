module.exports = {
  friendlyName: 'Delete',
  description: 'Delete quiz.',
  inputs: {
    id: {
      description: 'Quiz ID',
      type: 'number',
      required: true
    }
  },

  exits: {

  },


  fn: async function (inputs) {

    var result = await Quiz.destroyOne(inputs.id);
    if (result) {
      this.req.session.flash = { type: 'success', message: 'Quiz eliminato correttamente' };
    }
    else {
      this.req.session.flash = { type: 'error', message: 'Eliminazione del Quiz non riuscita' };
    }

    this.res.redirect('/quiz');

  }


};
