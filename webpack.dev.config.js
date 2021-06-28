const path = require("path");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const loaders = {
	sass: {
		test: /\.sass$/,
		use: ["style-loader", "css-loader", "sass-loader"]
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
	},
	js: {
		test: /\.tsx?/,
		exclude: [/node_modules/],
		use: ["babel-loader", "ts-loader"]
	},
	json: {
		test: /\.json$/,
		use: "json-loader"
	}
};

module.exports = {
	mode: "development",
	target: "web",
	context: `${__dirname}/source/`,
	entry: [
		`${__dirname}/source/ts/index.ts`,
		`${__dirname}/node_modules/webpack/hot/dev-server`
	],
	resolve: {
		extensions: [".ts", ".js", ".tsx"]
	},
	output: {
		path: `${__dirname}/build/`,
		publicPath: `/build/`,
		filename: `main.min.js`
	},
	module: {
		rules: [loaders.sass, loaders.media, loaders.js, loaders.json]
	},
	devServer: {
		contentBase: "./",
		inline: true,
		hot: true,
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept"
		}
	}
	// plugins: [
	// 	new BundleAnalyzerPlugin({ analyzerPort: ports[name] })
	// ]
};
