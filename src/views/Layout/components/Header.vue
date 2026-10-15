<template>
    <div class="toolbar cursor-pointer">
        <el-dropdown>
            <span>
                <el-icon style="margin-right: 8px; margin-top: 1px">
                    <setting />
                </el-icon>Tom</span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>View</el-dropdown-item>
                    <el-dropdown-item>Add</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
    router.push("/login")
    ElMessage.success('退出登录成功')
}
</script>

<style scoped lang="scss">
.layout-container {
    height: 100vh;

    .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
    }

    .toolbar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        right: 20px;

        .el-dropdown {
            margin-right: 10px;
            outline: none;
        }
    }
}
</style>
