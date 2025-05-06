const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(new CaseSensitivePathsPlugin());
  return config;
};
