const path = require("path");

module.exports = {
	devtool: "eval-source-map",
	entry: "./src/index.ts",
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "build")
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader"
			}
		]
	}
};