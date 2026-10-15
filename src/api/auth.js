// src/api/auth.js
import request from '@/utils/request';

// 登录 (POST)
export const loginApi = (params) => {
    return request({
        url: '/auth/login',
        method: 'post',
        params // GET 请求使用 params 
    });
}


// 注册 (POST)
export const registerApi = (data) => {
    return request({
        url: '/auth/register',
        method: 'post',
        data // POST 请求使用 data 
    });
}