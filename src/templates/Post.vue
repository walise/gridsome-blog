<template>
  <Layout>
    <!-- Page Header-->
    <!-- Post Content-->
    <article class="journal">
        <div class="container journal-container">
            <div class="journal-header">
                <h1 class="journal-title">{{$page.post.title}}</h1>
                <div class="journal-meta">
                    <div class="journal-author">
                        <span class="label">Author</span>
                        <span class="author-name">{{$page.post.author.name}}</span>
                    </div>
                    <div class="journal-date">
                        <span class="label">Created Date</span>
                        <span class="author-name">{{getDate($page.post.created_at)}}</span>
                    </div>
                    <div class="journal-time">
                        <span class="label">Read Time</span>
                        <span >{{$page.post.read_time   }}</span>
                    </div>
                </div>
            </div>
            <div class="journal-content" v-html="$page.post.content"></div>
        </div>
    </article>
  </Layout>
</template>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt() 
export default {
    metaInfo: {
        title: '文章详情'
    },
    name: 'postsPage',
    computed: {
    },
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
        post: strapiArticle(id:$id){
                id,
                title,
                description,
                created_at,
                content,
                read_time,
                author{
                    name
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