<template>
    <el-form :model="form" label-width="120px" style="max-width: 600px" @submit.prevent="onSubmit">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" class="w-full">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { loginApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import router from '@/router'

// do not use same username with ref
const form = reactive({
    username: '',
    password: '',
})

const onSubmit = async () => {
    const res = await loginApi(form)
    console.log(res)
    if (res.code === 200) {
        ElMessage.success('登录成功')
        // 登录成功后
        localStorage.setItem('satoken', res.token);
        router.push({ path: '/home/user/list' })
    }
}
</script>

<style lang="scss" scoped="scss"></style>