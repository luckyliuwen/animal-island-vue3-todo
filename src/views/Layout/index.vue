<template>
    <el-container class="layout-container">
        <Aside />

        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <Header />
            </el-header>

            <el-main>
                <el-scrollbar>
                    <router-view :key="$route.fullPath"></router-view>
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
const $route = useRoute()

const item = {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style scoped lang="scss">
.layout-container {
    height: 100vh;

    .el-header {
        position: relative;
        background-color: var(--el-color-primary-light-7);
        color: var(--el-text-color-primary);
    }

    .el-main {
        padding: 10px;
        background-color: var(--el-color-info-light-9);

        // .el-scrollbar {
        //     height: calc(100vh - 150px);
        //     // background-color: #fff;
        //     padding: 10px;
        //     border-radius: 15px;
        // }
    }
}
</style>
