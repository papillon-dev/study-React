module.exports = {
  devtool : 'eval-source-map',
    entry : ['./js/ContactsApp.js','./js/componet/Hello'],  // 멀티로 엔트리를 설정할 수 있다
    output : {
      path : './public',
      filename :  'bundle.js'  // 빌드후 경로 및 파일명 지정
    },
    devServer: {
    inline: true,
    contentBase : './public',  // dev 서버 설정
    port: 5555
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', // babel, babel-loader 차이점을 잘 모르겠습니다.
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }
};
