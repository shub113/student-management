const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
	const isDevMode = options.mode === 'development';

	return {

		entry: {
			main: './components/index.jsx'
		},
		output: {
			path: path.resolve('./build/'),
			filename: '[name].js',
		},
		devtool: isDevMode ? 'source-map' : false,
		resolve: {
			modules: [
				path.join(__dirname, 'src'),
				'node_modules'
			]
		},
		module: {
			rules: [
				{
					test: /(\.js|\.jsx)$/,
					exclude: /(node_modules)/,
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							'env',
							'react',
							'stage-0',
						],
						plugins: ['transform-decorators-legacy']
					}
				},
				{
					test: /\.css$/,
					use: [
						'style-loader',
						{
							loader: 'css-loader',
							options: {
								sourceMap: isDevMode
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: [
									require('autoprefixer')()
								],
								sourceMap: isDevMode
							}
						},
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg|ico)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: './assets/'
							}
						}
					]
				}
			]
		},
		optimization: {
			runtimeChunk: 'single', // enable "runtime" chunk
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						chunks: 'all'
					}
				}
			},
			minimizer: [
				new UglifyJsPlugin({
					sourceMap: true,
					uglifyOptions: {
					}
				})
			]
		},
	};
};