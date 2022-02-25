/*
 * @Description:
 * @Author: zhoulong.yang
 * @Date: 2021-06-07 11:42:49
 * @LastEditors: zhoulong.yang
 * @LastEditTime: 2021-06-11 10:43:42
 */
const rules = require('./stylelint-rules');

module.exports = {
  rules: {
    ...rules,
    'scss/at-import-partial-extension-blacklist': ['css'],
    'font-family-no-missing-generic-family-keyword': [true, { ignoreFontFamilies: ['xrkIcon'] }],
  },
};
