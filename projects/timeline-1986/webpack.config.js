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
    uniqueName: 'timeline1986',
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
    outputModule: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'timeline1986',
      filename: 'timeline1986Entry.js',
      exposes: {
        './Component': './projects/timeline-1986/src/app/timeline-1986.component.ts'
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
