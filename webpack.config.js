const HtmlWebpackPlugin = require('html-webpack-plugin')
const { NamedModulesPlugin, IgnorePlugin } = require('webpack')

module.exports = {
    entry: './src/rgb-to-hsl',
    output: './dist',
    plugins: [
        new HtmlWebpackPlugin(),
        new NamedModulesPlugin,
    ],
    module: {
        noParse: [
            /\/benchmark\/benchmark\.js/
        ]
    }
}