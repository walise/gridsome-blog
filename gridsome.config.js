// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-strapi',
      options: {
        apiURL: process.env.GRIDSOME_API_URL,
        queryLimit: 1000, // Defaults to 100
        contentTypes: ['authors','article','photographer','photos',],
        singleTypes: ['hero'],
        // Possibility to login with a Strapi user,
        // when content types are not publicly available (optional).
        loginData: {
          identifier: 'Huaxy',
          password: 'Hxy19941203'
        }
      }
    }
  ],
  templates: {
    // 希望文章详情也是静态页面
    StrapiArticle: [
      {
        path: '/post/:id',
        component: './src/templates/Post.vue'
      }
    ],
    StrapiPhotos: [
      {
        path: '/photo/:id',
        component: './src/templates/Photo.vue'
      }
    ]
  }
}
