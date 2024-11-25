const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require('path');

module.exports = {
    entry: './src/index.jsx',
    resolve: {
        modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: "fonts/[name][ext]"
                }
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
}