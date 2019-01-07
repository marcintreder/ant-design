const path = require('path');
const rucksack = require('rucksack-css');
const autoprefixer = require('autoprefixer');

const postcssConfig = {
  plugins: [
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 9', 'iOS >= 8', 'Android >= 4'],
    }),
  ],
}

const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};

const imageOptions = {
  limit: 10000,
};

module.exports = {
    entry: ['./src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      modules: [__dirname, 'node_modules'],
      extensions: ['*', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: Object.assign({}, postcssConfig, { sourceMap: true }),
            },
          ],
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: Object.assign({}, postcssConfig, { sourceMap: true }),
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                sourceMap: true,
              },
            },
          ],
        },

        // Images
        {
          test: svgRegex,
          loader: 'url-loader',
          options: svgOptions,
        },
        {
          test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
          loader: 'url-loader',
          options: imageOptions,
        },
      ],
    },
};
