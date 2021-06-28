const fs = require("fs");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const nodeModules = {};
fs.readdirSync("node_modules")
	.filter(x => [".bin"].indexOf(x) === -1)
	.forEach(mod => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

const loaders = {
	js: {
		test: /\.js?/,
		use: "babel-loader"
	},
	ts: {
		test: /\.tsx?$/,
		exclude: /\/node_modules\//,
		use: ["babel-loader", "ts-loader"]
	},
	json: {
		test: /\.json$/,
		use: "json-loader"
	},
	sass: {
		test: /\.sass$/,
		use: ExtractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader"]
		})
	},
	media: {
		test: /\.(jpg|jpeg|gif|png|woff|woff2|eot|ttf|svg|otf)$/,
		exclude: /\/node_modules\//,
		use: {
			loader: "file-loader",
			options: {
				name: "style/fonts/[name].[ext]"
			}
		}
	}
};

module.exports = {
	target: "web",
	mode: "production",
	context: `${__dirname}/source/`,
	entry: ["babel-polyfill", `${__dirname}/source/ts/index.ts`],
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	output: {
		path: `${__dirname}/build/`,
		filename: `main.min.js`
	},
	module: {
		rules: [loaders.ts, loaders.json, loaders.sass, loaders.media]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: `./style/style.min.css`,
			disable: false,
			allChunks: true
		}),
		new CopyWebpackPlugin([
			{
				from: `${__dirname}/source/style/img/`,
				to: `${__dirname}/build/style/img/`
			}
		])
	]
};
