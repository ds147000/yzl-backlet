/*
 * @Description:
 * @Author: zhoulong.yang
 * @Date: 2021-06-07 11:42:49
 * @LastEditors: zhoulong.yang
 * @LastEditTime: 2021-06-11 10:43:42
 */
const base = require('./stylelint-rules/base');
const rules = require('./stylelint-rules/rules');

module.exports = {
  extends: 'stylelint-config-standard-scss',
  rules: Object.assign(base, rules),
};
