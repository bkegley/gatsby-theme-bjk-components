const babelOptions = {
  presets: ['@babel/react', '@babel/env', 'babel-preset-gatsby'],
}

module.exports = require('babel-jest').createTransformer(babelOptions)
