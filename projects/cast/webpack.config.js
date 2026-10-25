const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const mf = require('@angular-architects/module-federation/webpack')
const path = require('path')
const { shareAll } = require('@angular-architects/module-federation/webpack')

const sharedMappings = new mf.SharedMappings()
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */])

module.exports = {
  output: {
    uniqueName: 'cast',
    publicPath: 'auto',
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases()
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'cast',
      filename: 'castEntry.js',
      exposes: {
        './Routes': './projects/cast/src/app/cast/cast.routes.ts'
      },
      shared: {
        ...shareAll({
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto'
        }),
        ...sharedMappings.getDescriptors()
      }

    }),
    sharedMappings.getPlugin()
  ]
}
