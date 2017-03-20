import axios from 'axios'
import {
    Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let METHOD

NProgress.inc(0.2)
NProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false
})

function $ajax(method, url, req, res) {
    METHOD = method
    if (method === 'get') {
        req._ = Math.random() * 16;
        return axios.get(url, {
                params: req,
                timeout: 10000
            })
            .then(function (response) {
                res(response.data.data)
            })
            .catch(function (error) {
                if (error.message === 'timeout of 10000ms exceeded') {
                    Message.error('请求超时！')
                }
            })
    } else {
        return axios.post(url, req)
            .then(function (response) {
                res(response.data.data)
            })
            .catch(function (error) {
                loadingInstance.close()
                Message.error(error.message)
            })
    }
}

axios.interceptors.request.use(function (config) {

    NProgress.start()
    return config
}, function (error) {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    NProgress.done()
    if (METHOD === 'post' && response.status === 200) {
        Message.success('操作成功')
    } else if (response.status !== 200 || response.data.code !== 0) {
        Message.error(response.data.msg)
    }
    return response;
}, function (error) {
    return Promise.reject(error)
})

function $tree(treeData) {

}

export {
    $ajax
}