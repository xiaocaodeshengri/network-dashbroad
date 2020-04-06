import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/components/login/Login.vue'

//新增内容
import PublicIPData from '@/components/cloudos/publicIP/data.vue'
import RouterNetworkRouter from '@/components/cloudos/routerNetwork/router.vue'
import RouterNetworkNetwork from '@/components/cloudos/routerNetwork/network.vue'
import InterIPData from '@/components/cloudos/interIP/data.vue'
import SlbResource from '@/components/cloudos/slb/resource.vue'
import PublicIPResource from '@/components/cloudos/publicIP/resource.vue'
import PublicIPtop from '@/components/cloudos/publicIP/top.vue'
import ResourceHistory from '@/components/cloudos/processResource/history.vue'


Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children:[

      {
        path: '/publicIP/data',
        components: {
          Contents: PublicIPData
        },
        meta: {
          title: '公网IP-数据对比'
        }
      },
      {
        path: '/routerNetwork/router',
        components: {
          Contents: RouterNetworkRouter
        },
        meta: {
          title: '路由与网络-路由信息'
        }
      },
      {
        path: '/routerNetwork/network',
        components: {
          Contents: RouterNetworkNetwork
        },
        meta: {
          title: '路由与网络-网络与子网'
        }
      },
      {
        path: '/interIP/data',
        components: {
          Contents: InterIPData
        },
        meta: {
          title: '内网IP-数据对比'
        }
      },
      {
        path: '/slb/resource',
        components: {
          Contents: SlbResource
        },
        meta: {
          title: '内网IP-资源汇总'
        }
      },
      {
        path: '/publicIP/resource',
        components: {
          Contents: PublicIPResource
        },
        meta: {
          title: '公网IP-资源汇总'
        }
      },  {
        path: '/publicIP/top',
        components: {
          Contents: PublicIPtop
        },
        meta: {
          title: '公网IP-资源汇总'
        }
      },
      {
        path: '/processResource/history',
        components: {
          Contents: ResourceHistory,
        },
        meta: {
          title: '已处理资源-查询'
        }
      },
    ],

  },
  {
    path: '/login',
    component: Login
  },


]

const router = new Router({
  routes
})


router.beforeEach((to, from, next) => {
  // 获取 JWT Token
  console.log(to['path'])

  console.log(localStorage.getItem('token'))
  if (localStorage.getItem('token')) {
    // 如果用户在login页面
    if (to['path'] === '/login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (to['path'] === '/login') {
      next();
    } else {
      next("/login");
    }
  }
});



export default router;
