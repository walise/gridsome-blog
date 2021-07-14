<template>
  <Layout>
    <!-- Main Content-->
    <div>
       <div class="journal-hero">
           <h1 class="journal-header">a wise person once said...</h1>
       </div>
       <g-link class="journal-post" v-for="article in $page.posts.edges" :key="article.node.id" :to="{path: '/post/'+article.node.id}">
           <div class="container journal">
               <h2 class="journal-title">{{article.node.title}}</h2>
               <div class="journal-excerpt" v-html="article.node.description"></div>
           </div>
       </g-link>
    </div>
  </Layout>
</template>

<script>
export default {
    name: 'PostsPage',
    metaInfo:{
        title: '博客列表',
    },
    methods: {
        addPost () {
            this.$router.push({
                path: '/addpost'
            })
        },
        toDetail(id){
            console.log(id)
            this.$router.push({
                path:'/post/'+id
            })
        }
    }
}
</script>
<page-query>
query{
	posts: allStrapiArticle{
		edges{
			node{
				id,
				title,
				content,
                description
			}
		}
	}
}
</page-query>
<style scoped>
    .journal-hero {
    padding: 4rem 0;
    text-align: center;
    color: #f3f3f3;
    }
.journal-header {
    font-size: 3rem;
    font-weight: 700;
    padding: 0;
    margin: 0;
}
@media (min-width: 560px){
    .journal-post {
        padding: 3rem 0;
    }
}
.journal-post {
    display: block;
    padding: 2rem 0;
    text-decoration: none;
    color: #333;
    transition: background .5s ease;
    overflow: hidden;
}
.journal-post .journal{
    max-width: 720px;
    position: relative;
}
.journal-post:hover{
    background: #f3f3f3;
}
@keyframes slide {
    from {left: 0;}
    to {left: 10%;}
  }
.journal-post:hover .journal{
    animation: slide;
    animation-duration: .8s;
    animation-fill-mode: forwards;
}
</style>