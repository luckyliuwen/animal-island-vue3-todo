<template>
    <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="120px" style="max-width: 600px"
        @submit.prevent="onSubmit(ruleFormRef)">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit" class="w-full">注册</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { registerApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import router from '@/router'
const ruleFormRef = ref(null)



// do not use same username with ref
const form = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    "nickname": "周超",
    "role": "admin",
    "permission": "user:add,user:delete,user:update",
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (form.confirmPassword !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('confirmPassword')
        }
        callback()
    }
}
const validatePass2 = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入确认密码'))
    } else if (value !== form.password) {
        callback(new Error("两次密码输入不一致"))
    } else {
        callback()
    }
}
const rules = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ validator: validatePass, trigger: 'blur' }],
    confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
})
const onSubmit = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
        if (valid) {
            const res = await registerApi(form)
            if (res.code === 200) {
                ElMessage.success('注册成功')
            }
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>

<style lang="scss" scoped="scss"></style>