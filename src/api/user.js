// src/api/user.js
import request from '@/utils/request';

// 获取用户信息 (GET)
export const getAllUser = (params) => {
    return request({
        url: '/users',
        method: 'get',
        params // GET 请求使用 params 字段[reference:10]
    });
}

// 新增用户 (POST)
export const addUser = (data) => {
    return request({
        url: '/users',
        method: 'post',
        data
    });
}

// 删除用户 (DELETE)
export const deleteUser = (id) => {
    return request({
        url: `/users/${id}`,
        method: 'delete'
    });
}

// 更新用户 (PUT)
export const updateUser = (data) => {
    return request({
        url: `/users`,
        method: 'put',
        data
    });
}

// 获取用户列表，根据分页和name查询
export const getUserList = (params) => {
    return request({
        url: '/users/page',
        method: 'get',
        params // GET 请求使用 params 字段[reference:10]
    });
}



