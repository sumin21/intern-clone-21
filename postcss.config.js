module.exports = (ctx) => ({
    parser: 'postcss-scss', // 파서 옵션을 설정하고 싶다면 여기에서
    plugins: [
     require('postcss-import')({
       path: ['app/assets/'],
     }),
    ]
   })