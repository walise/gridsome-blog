<template>
  <Layout :style="{color:$page.photo.color +'!important'}">
    <!-- Page Header-->
    <!-- Post Content-->
    <article class="journal">
        <div class="container journal-container">
            <div class="journal-header">
                <h1 class="journal-title">{{$page.photo.title}}</h1>
                <div class="journal-meta">
                    <div class="journal-author">
                        <span class="label">Categories</span>
                        <span class="author-name">photography,{{$page.photo.color}}</span>
                    </div>
                    <div class="journal-date">
                        <span class="label">Year</span>
                        <span class="author-name">{{getDate($page.photo.created_at)}}</span>
                    </div>
                </div>
            </div>
            <div class="journal-content" v-html="$page.photo.desc"></div>
            <img :src="$page.photo.image.url" alt="">
        </div>
    </article>
  </Layout>
</template>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt() 
export default {
    metaInfo: {
        title: '照片详情'
    },
    name: 'postsPage',
   methods: {
    //    将markdown 转换成 html
       getHtml (markdownStr) {
           return md.render(markdownStr)
       },
       getDate(date){
           const creatDate = new Date(date);
           return creatDate.getFullYear()
       }
   }
}
</script>
<page-query>
    query($id: ID!){
        photo: strapiPhotos(id:$id){
                id,
                title,
                created_at,
                color,
                author{
                    name
                },
                image{
                    url
                }
            }
        }
</page-query>
<style scoped>
    .journal-header{
        padding: 2rem 0 4rem;
    }
    .journal-title {
        font-size: 4rem;
        margin: 0 0 4rem;
        padding: 0;
    }
    img {
        max-width: 100%;
    }
    .journal-meta{
        display: flex;
        flex-wrap: wrap;
        font-size: .8rem;
    }
    .journal-meta div{
        margin-right: 20px;
    }
    .journal-meta div:last-child{
        margin: 0;
    }
</style>