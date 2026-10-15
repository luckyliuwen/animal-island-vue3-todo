<template>
    <div class="login-index-container">
        <el-tabs v-model="activeName" class="login-tabs" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
                <Login />
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
                <Register />
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import Login from './Login.vue'
import Register from './Register.vue'

const activeName = ref('login')

const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style lang="scss" scoped="scss">
.login-index-container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .login-tabs {
        margin-top: 100px;
        width: 500px;

        .el-tabs__content {
            padding: 32px;
            color: #6b778c;
            font-size: 32px;
            font-weight: 600;
        }

    }
}
</style>