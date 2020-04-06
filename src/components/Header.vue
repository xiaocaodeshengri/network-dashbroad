<template>
    <div style="width: 100%">
         <el-row>
             <el-col :span="10" >
                 <a class="navTop__logo" href="">.</a>
             </el-col>
             <el-col :span="14"  >
                <el-menu :default-active="activeIndex" :router="true" class="el-menu-demo" mode="horizontal">
                    <el-menu-item  style="color:#e6e6e6" index="/">首页</el-menu-item>
                    <el-menu-item  style="color:#e6e6e6" index="/about">关于</el-menu-item>
                    <el-submenu  style="color:#e6e6e6" v-if="username != null" index="4"><template slot="title">{{ username }}</template>
                        <el-menu-item @click.native="logout()">退出</el-menu-item>
                    </el-submenu>
                    <el-submenu   style="color:#e6e6e6" v-else index="4"><template slot="title">Login</template>
                        <el-menu-item index="/login">Login</el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-col>

        </el-row>
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

                        this.$store.commit(types.LOGOUT);
                        this.$router.push('/');
                        this.reload()

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
    .el-menu.el-menu--horizontal {
        background-color: #1472dc;
    }
    .navTop__logo{
        height: 55px;
        width: 130px;
        float: left;
        background-image: url(../assets/1.jpg);
        background-repeat: no-repeat;
        background-position: 50%;
        display: inline-block;
    }
    .el-menu.el-menu--horizontal {
        background-color: #1472dc;
        float: right;
    }
</style>
