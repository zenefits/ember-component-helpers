import Ember from 'ember';
import { keyword, isEnabled, closureComponent, EmptyObject, assign } from '../-private/component-imports';

const {typeOf, A} = Ember;

function normalizeParams([nameChild, argsChild]) {
  let nameValue = nameChild.compute ? nameChild.compute() : nameChild;
  let newParams = A([nameValue]);
  let args = argsChild.compute();
  newParams.pushObjects(args);
  return newParams;
}

function splitArgsHash(params, originalHash) {
  if (params.length <= 1) {
    return [params, new EmptyObject()];
  }
  let maybeHash = params[params.length - 1];
  if (typeOf(maybeHash) === "object") {
    return [params.slice(0, params.length - 1), assign(new EmptyObject(), assign(maybeHash, originalHash))];
  }
  return [params, assign(new EmptyObject())];
}
// Modified from
// https://github.com/emberjs/ember.js/blob/master/packages/ember-htmlbars/lib/keywords/component.js
export default function(morph, env, scope, params, _hash, template, inverse, visitor) {
  const [newParams, newHash] = splitArgsHash(normalizeParams(params), _hash);

  if (isEnabled('ember-contextual-components')) {
    if (!morph) {
      return closureComponent(env, newParams, newHash);
    }
  }
  if (env.hooks.component) {
    // let componentPath = morph.state.componentPath;
    let [componentPath] = newParams.splice(0,1);

    // If the value passed to the {{component}} helper is undefined or null,
    // don't create a new ComponentNode.
    if (componentPath === undefined || componentPath === null) {
      return;
    }
    // Extract from keyworkds/link-to#v1.13.13
    newHash.params = newParams; // attrs.params = _emberMetalStreamsUtils.readArray(params); ?
    newHash.view = env.view;
    newHash.hasBlock = !!template;
    newHash.escaped = !morph.parseTextAsHTML;

    env.hooks.component(morph, env, scope, componentPath, newParams, newHash, { default: template, inverse }, visitor);
    return true;
  }
  keyword('@element_component', morph, env, scope, newParams, newHash, template, inverse, visitor);
  return true;
}
