module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 8090,
        proxy: {
            '/api/': {
                // target: 'http://10.0.7.154:18087',
             target: 'http://10.0.7.147:18087',
                //target: 'http://localhost:18087',
                 //target: 'http://10.0.7.136:18087',
                changeOrigin: true,
                pathRewrite: {'^/api' : ''}
            },
            '/auth/': {
                target: 'http://10.0.46.156:11200',
                changeOrigin: true,
                pathRewrite: {'^/auth' : ''}
            }


        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import '~@/assets/css/color.scss';`
            }
        }
    }
}

