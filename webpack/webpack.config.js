const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (options) => {
  const webpackConfig = {
    mode: options.isProduction ? 'production' : 'development',
    devtool: options.devtool,
    entry: [
      // `webpack-dev-server/client?https://www.runesx.com:${+options.port}`,
      'webpack-dev-server/client?https://localhost',
      'webpack/hot/dev-server',
      Path.join(__dirname, '../src/app/index'),
    ],
    output: {
      path: Path.join(__dirname, '../dist'),
      filename: `./scripts/[name].${options.jsFileName}`,
      chunkFilename: '[id].[chunkhash].js',
      publicPath: '/',
      assetModuleFilename: 'static/images/[hash][ext][query]',
    },
    optimization: {
      chunkIds: 'total-size',
      moduleIds: 'size',
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                [
                  'gifsicle',
                  {
                    interlaced: true,
                  },
                ],
                [
                  'jpegtran',
                  {
                    progressive: true,
                  },
                ],
                [
                  'optipng',
                  {
                    optimizationLevel: 5,
                  },
                ],
              ],
            },
          },
        }),
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            compress: {
              drop_console: true,
            },
            output: {
              comments: !!options.isProduction,
            },
          },
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        fs: false,
        module: false,
        typescript: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                envName: !options.isProduction ? 'development' : 'production',
                plugins: [
                  !options.isProduction && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
              },
            },
          ],
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]',
          },
        },
        {
          test: /\.svg$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/images/[hash][ext][query]',
          },
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
                titleProp: true,
                ref: true,
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
          type: 'asset/resource',
          generator: {
            filename: 'static/fonts/[hash][ext][query]',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /.jsx?$/,
          include: Path.join(__dirname, '../src/app'),
          use: {
            loader: 'babel-loader',
            options: {
              envName: !options.isProduction ? 'development' : 'production',
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
              ],
              plugins: [
                '@babel/plugin-transform-runtime',
              ],
            },
          },
        }],
    },

    plugins: [
      !options.isProduction && new ReactRefreshWebpackPlugin(),
      new Webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new Webpack.ProvidePlugin({
        Buffer: [
          'buffer',
          'Buffer',
        ],
      }),
      new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../src/index.html'),
        NODE_ENV: options.isProduction ? 'production' : 'development',
        minify: {
          removeComments: false,
        },
      }),
    ].filter(Boolean),
  };

  if (options.isProduction) {
    webpackConfig.entry = [Path.join(__dirname, '../src/app/index')];

    webpackConfig.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: Path.join(__dirname, '../static'),
            to: Path.join(__dirname, '../dist/static'),
          },
        ],
      }),
    );

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', // or MiniCssExtractPlugin.loader
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    });

    webpackConfig.plugins.push(
      new WebpackObfuscator({
        rotateStringArray: true,
      }, [
        'excluded_bundle_name.js',
      ]),
    );
  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin(),
    );

    webpackConfig.module.rules.push({
      rules: [
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    });

    webpackConfig.devServer = {
      hot: !!options.isProduction,
      port: options.port,
      historyApiFallback: true,
      host: 'localhost',
      client: {
        overlay: false,
        logging: 'warn', // Want to set this to 'warn' or 'error'
      },
    };
  }

  return webpackConfig;
};
