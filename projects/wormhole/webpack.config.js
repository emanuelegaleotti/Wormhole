const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const mf = require('@angular-architects/module-federation/webpack')
const path = require('path')
const share = mf.share

const sharedMappings = new mf.SharedMappings()
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),
  [/* mapped paths to share */])

module.exports = {
  output: {
    uniqueName: 'wormhole',
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
      remotes: {
        cast: 'cast@http://localhost:3000/castEntry.js',
        weather: 'weather@http://localhost:3300/weatherEntry.js',
        cityWeather: 'cityWeather@http://localhost:3600/cityWeatherEntry.js',
        timeline1953: 'timeline1953@http://localhost:3953/timeline1953Entry.js',
        timeline1986: 'timeline1986@http://localhost:3986/timeline1986Entry.js',
        timeline2019: 'timeline2019@http://localhost:4019/timeline2019Entry.js'
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        '@jsverse/transloco': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        'ngx-webstorage': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        ...sharedMappings.getDescriptors()
      })

    }),
    sharedMappings.getPlugin()
  ]
}
