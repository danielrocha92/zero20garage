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

  // Habilitar a resolução de extensões TypeScript
  config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

  // Encontrar o babel-loader nas regras (normalmente fica dentro do oneOf)
  const oneOfRule = config.module.rules.find(rule => rule.oneOf);
  if (oneOfRule) {
    const babelLoader = oneOfRule.oneOf.find(rule => 
      rule.loader && rule.loader.includes('babel-loader')
    );
    if (babelLoader) {
      // Forçar que o babel-loader também processe arquivos ts/tsx
      babelLoader.test = /\.(js|mjs|jsx|ts|tsx)$/;
    }
  }

  return config;
};