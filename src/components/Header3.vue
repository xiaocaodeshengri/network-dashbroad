<template>
    <div class="navTop">
        <a  class="navTop__logo" href="">.</a>
        <div class="header-right">
         <el-row>
             <el-col :span="10" :offset="23">
                <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
                    <el-menu-item  class="color:#eaeaea" index="/">首页</el-menu-item>
                    <el-menu-item index="/about">关于</el-menu-item>
                    <el-submenu class ="login-class" v-if="username != null" index="4"><template slot="title">{{ username }}</template>
                        <el-menu-item @click.native="logout()">退出</el-menu-item>
                    </el-submenu>
                    <el-submenu class ="login-class" v-else index="4"><template slot="title">Login</template>
                        <el-menu-item index="/login">Login</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
    import * as types from '@/store/types'
    export default {
        inject: ['reload'],
        props: ['categorys'],
        data() {
            return {
                topoFormVisible: false,
                dialogFormVisible: false,
                registerFormVisible: false,
                username: null,
                activeIndex: '1',
                links: [],
                topos: [],
            };
        },
        mounted() {
            this.linkList();
            this.topoList();
            this.getUsername()
        },
        methods: {

            linkList(){
                this.$axios.get(this.$api.linkList,
                    {
                        params: {page: 1, size: 100, category_id: 17}
                    }).then((response) => {
                    this.links = response.data['res']
                })
            },
            topoList(){
                this.$axios.get(this.$api.topoList).then((response) => {
                    this.topos = response.data['res']
                })
            },
            getUsername(){
                this.username = localStorage.getItem("username")
            },
            logout(){
                this.$axios.get(this.$api.logoutApi).then((response) => {
                    if(this.messageShow(this, response)){
                        this.$store.commit(types.LOGOUT);
                        this.$router.push('/');
                        this.reload()
                    }
                })
            },

            register(){
                this.registerFormVisible = true
            },
            cancelBtn(){
                this.initPasswordForm()
                this.dialogFormVisible = false
            },
        }
    }
</script>
<style type="text/css">
    .el-header {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #1472dc;
    }
    .login-class{
        background-color: #1472dc;
    }
    .el-menu--horizontal>.el-menu-item {
        color: #eaeaea;
        background-color: #1472dc;
    }
    .navTop__logo{
        height: 100%;
        width: 130px;
        background-image: url(../assets/1.jpg);
        background-repeat: no-repeat;
        background-position: 50%;
        display: inline-block;
    }
    .navTop {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 300;
        background-color: #1472dc;
        line-height: 50px;
        color: #fff;
        padding: 0;
    }
    .header-right{
        position: absolute;
        top: 0;
        left: 130px;
        height: 100%;
        width : calc(100% - 300px);
        background-color: #1472dc;
    }
</style>
