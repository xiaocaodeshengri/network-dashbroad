<template>
    <el-row class="tac" >
        <el-col >
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :router="true"
            @open="handleOpen"
            @close="handleClose">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>公网IP</span>
                    </template>
                    <el-menu-item index="/publicIP/resource">资源汇总</el-menu-item>
                    <el-menu-item index="/publicIP/top">TOP租户</el-menu-item>
                    <el-menu-item index="/publicIP/data">数据对比</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>内网IP</span>
                    </template>
                    <el-menu-item index="/interIP/data">数据对比</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-s-platform"></i>
                    <span>负载均衡器</span>
                    </template>
                    <el-menu-item index="/slb/resource">资源汇总</el-menu-item>
                    <el-menu-item index="/slb/top">TOP租户</el-menu-item>
                    <el-menu-item index="/slb/data">数据对比</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>路由与网络</span>
                    </template>
                    <el-menu-item index="/routerNetwork/router">路由器信息</el-menu-item>
                    <el-menu-item index="/routerNetwork/network">网络与子网</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>已处理资源</span>
                    </template>
                    <el-menu-item index="/processResource/history">处理历史记录</el-menu-item>
                </el-submenu>

            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
  // import * as types from '@/store/types'
  export default {
    data(){
      return {
        role: Number
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      getRole(num){
        this.role = localStorage.getItem("role")
        if(this.role >= num){
          return true
        }else{
          return false
        }
      }
    }
  }
</script>
<style type="text/css">
    .tac{
        position: fixed;
    }

</style>
