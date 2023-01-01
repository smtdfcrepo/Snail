const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: './src/scripts/main.js',
  mode: "production",
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'snail.js',
    globalObject: 'this',
    library: {
      name: 'snail',
      type: 'umd',
    }
  },
  plugins: [
   new MiniCssExtractPlugin(),
  ],
};