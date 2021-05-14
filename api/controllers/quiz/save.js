module.exports = {

  friendlyName: 'Save',

  description: 'Save quiz.',

  inputs: {

    id: {
      type: 'number',
      allowNull: true
    },

    type: {
      type: 'number',
      defaultsTo: 0
    },

    question: {
      type: 'string',
      require: true
    },

    choices: {
      type: 'json',
      description: 'json array contains the choices in a multiple choice quiz'
    },

    answer: {
      type: 'string',
      required: true
    },

    place_id: {
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/homepage'
    }

  },


  fn: async function (inputs) {

    if (_.isUndefined(inputs.id)) {

      await Quiz.create(inputs)
        .intercept({ question: 'UsageError' }, (err) => {

          return 'nameFail';

        })
        .intercept({ choices: 'UsageError' }, (err) => {

          return 'descriptionFail';

        });

    }
    else {

      var result = await Quiz.updateOne(inputs.id).set(inputs)
        .intercept({ question: 'UsageError' }, (err) => {
          return 'questionFail';
        });
    }

    // All done.
    return;

  }


};
