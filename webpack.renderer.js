const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	target: "web",
	output: {
		filename: "renderer.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js", ".tsx"],
		modules: [path.join(__dirname, "src"), "node_modules"],
		alias: {
			src: path.resolve(__dirname, "src"),
		},
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
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
		}),
	],
};
