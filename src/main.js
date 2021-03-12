define(function (require) {
  'use strict';

  const _ = require('underscore');
  const Component = require('Component');
  const template = require('/template/main');
  const errorTemplate = require('/template/templateError');

  return Component.extend({

    getTemplate: function () {
      if (this.state.route === '/template') {
        return errorTemplate;
      } else {
        return template;
      }
    },

    className: 'afplay-webinar-content',

    filterState: function (state) {
      console.log(state);
      return _.extend({}, {});
    }

  });
});
