import Ember from 'ember';

function safeRequire(path) {
  if (Ember.__loader.registry[path]) {
    return Ember.__loader.require(path).default;
  }
}

// We need to check since this isn't available in 1.13.x
let closureComponent = safeRequire('ember-htmlbars/keywords/assign/closure-component');
// TODO: add polyfil for 1.13.13 since merge isn't exactly the same
let assign = Object.assign || safeRequire('ember-metal/assign') || safeRequire('ember-metal/merge');
let isEnabled = safeRequire('ember-metal/features') || Ember.FEATURES.isEnabled;

const { keyword } = Ember.__loader.require('htmlbars-runtime/hooks');
const {'default': EmptyObject} = Ember.__loader.require('ember-metal/empty_object');
const { registerKeyword } = Ember.__loader.require('ember-htmlbars/keywords');

export {closureComponent, keyword, EmptyObject, assign, isEnabled, registerKeyword};
