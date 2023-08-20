/*
 * @Description:
 * @Version:
 * @Autor: Ban
 * @Date: 2022-06-29 14:58:30
 * @LastEditors: Ban
 * @LastEditTime: 2023-03-27 20:08:50
 */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],

  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.android.js',
          '.ios.js',
          '.android.jsx',
          '.ios.jsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@': './src',
        },
      },
    ],
    [
      'import',
      {
        libraryName: '@icon-park/svg',
        libraryDirectory: 'es/icons',
        camel2DashComponentName: false,
      },
    ],
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg'],
      },
    ],
  ],
};
