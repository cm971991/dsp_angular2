var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': './src/shared/polyfills.ts',  //运行ng2的兼容性文件
		'vendor': './src/shared/vendor.ts',  //各类第三方插件
		'app': './src/shared/main.ts'  //程序代码
	},
	
	resolve: {
		extensions: ['', '.ts', '.js']  //解析哪些文件格式
	},
	
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file?name=assets/[name].[hash].[ext]'
			},
			{
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			},
			{
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw'
			}
		]
	},
	
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};
