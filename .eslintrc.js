module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    // 'plugin:ember/recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    // 'ember/alias-model-in-controller': 0,
    // 'ember/avoid-leaking-state-in-components': 0,
    // 'ember/closure-actions': 0,
    // 'ember/jquery-ember-run': 0,
    // 'ember/local-modules': 0,
    // 'ember/named-functions-in-promises': 0,
    // 'ember/no-empty-attrs': 0,
    // 'ember/no-function-prototype-extensions': 0,
    // 'ember/no-observers': 0,
    // 'ember/no-on-calls-in-components': 0,
    // 'ember/no-side-effects': 0,
    // 'ember/order-in-components': 0,
    // 'ember/order-in-controllers': 0,
    // 'ember/order-in-models': 0,
    // 'ember/order-in-routes': 0,
    // 'ember/query-params-on-top': 0,
    // 'ember/routes-segments-snake-case': 0,
    // 'ember/use-brace-expansion': 0,
    // 'ember/use-ember-get-and-set': 0,
  }
};
