<template>
  <el-container direction="vertical">
    <el-header>
      <Header>

      </Header>
    </el-header>
    <el-container>
      <el-aside style="width:280px;height: 900px;border-right:solid 1px #e6e6e6">
          <Aside/>
      </el-aside>
      <el-main>
            <router-view name="Contents" style="font-family: Arial"></router-view>
      </el-main>
    </el-container>
      <!--<el-footer>
        <Footer/>
      </el-footer>-->
  </el-container>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'home',
  components: {
    Header: Header,
    Aside: Aside,
   Footer: Footer
  },
  data() {
    return {
      categorys: []
    }
  },
  mounted() {
    this.projectList()
  },
  methods: {
    projectList(){
      this.$axios.get(this.$api.projectList,
      {
        params: {page: 1, size: 100}
      }).then((response) => {
          this.categorys = response.data['res']
      })
    },
  }
}
</script>

<style type=text/css>
  .el-header {
    background-color: #1472dc;
  }
  .el-aside {
    text-align: center;
    line-height: 200px;

    border-color: #B3C0D1
  }
  .el-footer{
      height:60px;
      position:fixed;
      bottom:40px;
      left:0px;
      width: 100%
  }
</style>

