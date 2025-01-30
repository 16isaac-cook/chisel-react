const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = {
    entry: "./src/App/index.tsx",
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
    },
    module: {
        rules: [
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: "asset/resource",
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "images/[name][ext]",
                },
            },
        ],
    },
    plugins: [new BundleAnalyzerPlugin()],
};
