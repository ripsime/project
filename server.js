const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

/* Body Parser ******************************************************* */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Router ******************************************************* */
require("./api/routes/layout.routes.js")(app);

/* Webpack configuration ******************************************************* */
if (process.env.NODE_ENV === "development") {
	const webpack = require("webpack");

	const webpackDevMiddleware = require("webpack-dev-middleware");
	const webpackHotMiddleware = require("webpack-hot-middleware");

	const webpackConfig = require("./webpack.dev.config");
	const compiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(compiler, {
			noInfo: true,
			publicPath: webpackConfig.output.publicPath,
			hot: true,
			filename: "bundle.js",
			stats: { colors: true },
			historyApiFallback: true,
		})
	);

	app.use(
		webpackHotMiddleware(compiler, {
			log: console.log,
			path: "/__webpack_hmr",
			heartbeat: 10 * 1000,
		})
	);
} else {
	app.use(express.static(process.cwd()));
}

app.get("/*", (req, res) => {
	res.sendFile(process.cwd() + "/public/index.html");
});

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
