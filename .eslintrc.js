/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-08-28 20:08:36
 * @LastEditors: Ban
 * @LastEditTime: 2023-04-14 21:52:27
 */
module.exports = {
  root: true,
  // extends属性表示启用一系列核心规则，若有plugins属性表示同时启用插件的核心规则
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    '@react-native-community',
  ],
  // 设置解析器
  parser: '@babel/eslint-parser',
  // 解析器选项
  parserOptions: {
    // 表示一些附加特性的对象, 支持JSX
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 8,
  },
  // 支持使用的第三方插件，在使用插件之前，你必须使用 npm 安装它。
  // plugins: ['react'],
  // 规则配置
  rules: {
    indent: ['off', 'tab'],
    'linebreak-style': ['off', 'windows'],
    quotes: [1, 'single'],
    semi: ['error', 'always'],
    'react/jsx-indent-props': ['error', 4],
    'react/no-direct-mutation-state': 2,
    'no-console': 0,
    'no-debugger': 2,
    'react/jsx-indent-props': 0,
    'no-dupe-keys': 0,
    'no-unused-vars': 'off',
    'react/display-name': 0,
    'react/prop-types': 0,
    'use-isnan': 0,
    'no-undef': 0,
    'react/jsx-no-duplicate-props': 0,
    'no-empty-pattern': 0,
    eqeqeq: 0,
    curly: 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react-native/no-inline-styles': 0,
    'react-hooks/rules-of-hooks': 1,
    'dot-notation': 0,
    'react-hooks/exhaustive-deps': 1,
  },
};
