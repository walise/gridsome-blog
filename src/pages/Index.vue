<template>
  <Layout>
    <!-- Main Content-->
    <!-- author-inform -->
        <div class="hero"> 
            <h1 class="hero-title">{{$page.hero.edges[0].node.tile}}</h1>
            <h2 class="hero-subtitle">{{$page.hero.edges[0].node.sub_title}}</h2>
        </div>
        <!-- pros -->
        <div class="projects">
            <div class="project" v-for="photo in $page.photos.edges" :key="photo.node.id">
                <g-link class="project-link" :to="{path:'/photo/'+photo.node.id}">
                <g-image :src="GRIDSOME_API_URL+photo.node.image.url" alt="" class="thumbnail"></g-image>
                    <h3 class="project-title">{{photo.node.title}}</h3>
                    <div data-v-50cbff3e="" class="categories">
                        <span  class="category">photography</span>
                        <span class="category"></span>
                    </div>
                </g-link>
            </div>
        </div>
        <div>
            <div class="latest-journals-heading container">
                <span  class="label">Latest and greatest</span>
            </div>
            <!-- 最多显示最近发布的六篇文章 -->
            <div class="latest-journals">
                <div class="container">
                    <g-link class="journal" v-for="post in $page.posts.edges" :key="post.node.id" :to="{path:'/post/'+post.node.id}" >{{post.node.title}}</g-link>
                </div>
            </div>
        </div>
  </Layout>
</template>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  metaInfo: {
    title: '首页'
  },
  data(){
    return {
    }
  },
  computed: {
  },
  methods: {
    renderHtml (str) {
        return md.render(str)
    }
  }
  // inject: ['reload']
}
</script>
<page-query>
  query{
    photos: allStrapiPhotos{
      edges{
        node{
          id,
          image{
            url
          },
          title,
        }
      }
    },
    posts: allStrapiArticle{
      edges{
        node{
          id,
          title
        }
      }
    },
    hero: allStrapiHero{
   	edges{
      node{
        id,
        tile,
        sub_title
      }
    }
  }
}
</page-query>
<style scoped>
.hero {
    text-align: center;
    width: 480px;
    max-width: 100%;
    margin: 0 auto;
    padding: 4rem 0 8rem;
}
.hero-title {
    font-size: 3rem;
    font-weight: 700;
    padding: 0;
    margin: 0 0 2rem;
}
.hero-subtitle {
    font-size: 1.15em;
    font-weight: 400;
    line-height: 1.68;
    opacity: .6;
}
.projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 4rem;
}
.project {
    grid-column: auto/span 2;
    text-align: center;
}
@media (min-width: 920px){
  .project{
    grid-column: auto/span 1;
  }
  .project:nth-child(3n+1){
    grid-column: auto/span 2;
  }
}
.project-link{
    text-decoration: none;
    
}
.thumbnail{
    height: 560px;
    -o-object-fit: cover;
    object-fit: cover;
    transition: all .15s ease;
}
.thumbnail:hover{
    transform: scale(1.02);
    box-shadow:  0 0 20px 0 rgb(0 0 0 / 25%);
}
img {
    max-width: 100%;
}
.project-title{
    font-size: 1rem;
    color: #000;
    margin: 2rem 0 1rem;
}
.categories{
    font-size: .8rem;
    color: #2b2b2b;
}
.latest-journals-heading{
  margin: 4rem 0 2rem;
}
.latest-journals {
    max-width: 100%;
    margin: 0 2rem;
    border: 1px solid #f3f3f3;
}
.latest-journals > .container{
    display: flex;
    flex-wrap: wrap;
}
.journal {
    color: #000;
    font-weight: 600;
    padding: 2rem;
    transition: background .25s ease;
    text-decoration: none;
    border-bottom: 1px solid #f3f3f3;
}
.journal:hover{
    background: #f3f3f3;
}
@media screen and (max-width: 580px){
  .journal:first-child, .journal:nth-child(2) {
      border-bottom: 1px solid #f3f3f3;
  }
  .journal{
      flex: 0 0 100%;
  }
}
@media screen and (min-width: 580px){
  .journal:first-child, .journal:nth-child(2) {
      border-bottom: 1px solid #f3f3f3;
  }
  .journal{
      flex: 0 0 calc(50% - 4rem);
  }
}
@media screen and (min-width: 920px){
  .journal{
    flex: 1;
    border-right: 1px solid #f3f3f3;
  }
  .journal:last-child {
      border: none;
  }
}
</style>
