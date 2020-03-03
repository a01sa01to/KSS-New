const path = require("path");

module.exports = {
	// entry: ["@babel/polyfill", "./reactFiles/script.js"],
	entry: ["./reactFiles/script.js"],
	mode: "production",
	// mode: "development",
	module: {
		rules: [{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/env"]
				}
			}
		]
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"]
	},
	output: {
		path: path.resolve(__dirname),
		filename: "bundle.js"
	}
};