import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建 axios 实例
const request = axios.create({
    baseURL: '/dev-api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么，例如添加 token
        const token = localStorage.getItem('satoken')
        if (token) {
            config.headers['Authorization'] = `${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        // 对响应数据做点什么
        if (response.data.code === 200) {
        } else if (response.data.code === 401) {
            ElMessage.error('未授权，请重新登录')
            router.push({ path: '/login' })
        } else if (response.data.code === 404) {
            ElMessage.error('请求的资源不存在')
        } else if (response.data.code === 400) {
            ElMessage.error('请求参数错误')
        } else if (response.data.code === 500) {
            ElMessage.error(response.data.msg)
        }
        return response.data

    },
    error => {
        console.log('响应错误:', error)
        // 对响应错误做点什么
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 未授权，跳转到登录页
                    console.log('未授权，请重新登录')
                    break
                case 404:
                    console.log('请求的资源不存在')
                    break
                default:
                    console.log('请求失败')
                    ElMessage.error('请求失败')
                    break
            }
        }
        return Promise.reject(error)
    }
)

export default request