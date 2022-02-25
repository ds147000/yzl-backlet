const base = require('./base');
const rules = require('./rules');

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-sass-guidelines'],
  rules: Object.assign(base, rules),
};
