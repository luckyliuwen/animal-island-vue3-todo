<template>
    <div class="my-card">
        <el-form :inline="true" label-width="80px" :model="searchForm" class="search-form" @submit.prevent="onSubmit">
            <el-form-item label="用户名">
                <el-input v-model="searchForm.name" placeholder="用户名" clearable @clear="onReset" />
            </el-form-item>

            <el-form-item>
                <!-- 为了让点击按钮也能触发表单提交，加上 native-type="submit" -->
                <el-button type="primary" native-type="submit" :icon="Search">搜索</el-button>
                <el-button @click="onReset" :icon="RefreshRight">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script setup>
import { reactive } from 'vue'
import { Search, RefreshRight } from '@element-plus/icons-vue'
const emit = defineEmits(['search'])

const searchForm = reactive({
    name: '',
})

const onSubmit = () => {
    emit('search', searchForm.name)
}

const onReset = () => {
    searchForm.name = ''
    emit('search', searchForm.name)
}
</script>

<style scoped lang="scss">
.search-form {
    .el-input {
        --el-input-width: 220px;
    }

    .el-select {
        --el-select-width: 220px;
    }
}
</style>
