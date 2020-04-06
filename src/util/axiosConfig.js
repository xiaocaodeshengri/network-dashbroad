import axios from 'axios'
// http response 拦截器（所有接收到的请求都要从这儿过一次）

axios.interceptors.request.use(
    config => {

        if (localStorage.token) { //判断token是否存在
            console.log("添加token")
            config.headers.common['X-Auth-Token'] = localStorage.token;  //将token设置成请求头
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axios;
