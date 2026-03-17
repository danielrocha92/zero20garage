const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(new CaseSensitivePathsPlugin());

  // Webpack 5 não inclui polyfills para módulos Node.js automaticamente.
  // Como rodamos no browser, definimos como false para usar módulos vazios.
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: false,
    https: false,
    stream: false,
    assert: false,
    url: false,
    zlib: false,
    path: false,
    fs: false,
    net: false,
    tls: false,
    crypto: false,
  };

  return config;
};