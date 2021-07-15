<template>
    <div class="alerts">
        <div class="alert" :class="addClass.className" v-if="myDisplay">
            <i class="fa" :class="addClass.icon"></i>
            {{title}}
            <button type="button" class="btn-close" @click="hideDisplay">X</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
        },
        type: {
            type: String,
            default: false
        },
        // display: {
        //     type: Boolean
        // }
    },
    data: function () {
        return {
            className: '',
            icon: '',
            myDisplay: false
        }
    },
    watch: {
        display(oldValue,newValue){
            // watch 监听 解决props 赋值给data 无效
            // data（）函数只是在初始化的时候会运行一次。所以总是空。而我们异步过来的数据，需要watch他 才能得到。
            this.myDisplay = newValue
        }
    },
    computed: {
        addClass () {
            switch (this.$props.type){
                case 'success':
                    this.className = 'alert-success';
                    this.icon = 'fa-check-circle';
                break;
                case 'warning':
                    this.className = 'alert-success';
                    this.icon = 'fa-exclamation-triangle';
                break;
                case 'danger':
                    this.className = 'alert-success';
                    this.icon = 'fa-exclamation-triangle';
                break;
                default:
                    this.className = 'alert-primary';
                    this.icon = 'fa-info-circle';
                break;
            }
            return {
                className: this.className,
                icon: this.icon
            }
        }
    },
    updated () {
        console.log('更新'+this.myDisplay)
    },
    destroyed () {
        console.log('组件销毁')
    },
    methods: {
        showDisplay(){
            console.log('显示')
            this.myDisplay = true;
        },
        hideDisplay(){
            console.log('隐藏')
            this.myDisplay = false;
        }
    }
}
</script>

<style>
    .alerts{
       display: flex;
       justify-content: center;
       align-items: center;
       position: fixed;
       max-width: 150px;
       white-space: nowrap;
       left: calc(50% - 50px);
    }
    .btn-close{
        background: none;
        margin: 0;
        color: #333;
    }
    .alert{
        padding-left: 20px;
    }
    .alert-primary {
        color: #084298;
        background-color: #cfe2ff;
        border-color: #b6d4fe;
    }
    .alert-success {
        color: #0f5132;
        background-color: #d1e7dd;
        border-color: #badbcc;
    }
    .alert-danger {
        color: #842029;
        background-color: #f8d7da;
        border-color: #f5c2c7;
    }
    .alert-warning {
        color: #664d03;
        background-color: #fff3cd;
        border-color: #ffecb5;
    }
    .fadeout{
        -webkit-transition: all 1.5s; 
        -moz-transition: all 1.5s; 
        -ms-transition: all 1.5s; 
        -o-transition: all 1.5s; 
        transition: all 1.5s; 
        opacity: 0;
    }
    .fadein{
        -webkit-transition: all 1.5s; 
        -moz-transition: all 1.5s; 
        -ms-transition: all 1.5s; 
        -o-transition: all 1.5s; 
        transition: all 1.5s; 
        opacity: 1;
    }
</style>