const webpack = require("webpack");
const path = require("path");

process.env.NODE_ENV = "development";

module.exports = {
	mode: "development",
	target: "web",
	devtool: "cheap-module-source-map",
	entry: ["webpack-hot-middleware/client", "babel-polyfill", "./src/index"],
	output: {
		path: path.resolve(__dirname, "dist"),
		publicPath: "/dist/",
		filename: "bundle.js",
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development"),
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(gif|png|jpg|eot|svg|ttf|woff|woff2)$/,
				use: ["file-loader"],
			},
			{
				test: /\.less$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
						},
					},
					"less-loader",
				],
			},
		],
	},
};
