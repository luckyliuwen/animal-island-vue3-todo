<template>
    <div>
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
        <el-icon>
            <Plus />
        </el-icon>
        <!-- icon格式：图标库:图标名 -->
        <Icon icon="mdi:home" />
        <Icon icon="ri:search-line" size="24" color="#409eff" />
        <Icon icon="tabler:accessible-filled" size="24" color="#409eff" />
        <hr />
    </div>
    <div>
        <i-ep-add-location style="color:orange;font-size: 50px;" />
        <i-ant-design-user-outlined style="color:green;font-size: 50px;" />

        <!-- 本地图标 -->
        <i-local-user style="color:red;width: 50px;height: 50px;" />
        <div class="p-8 text-center">
            <div class="text-blue-600">Tailwind</div>
            <div class="text-green-600">Tailwind</div>
        </div>
    </div>
    <div v-for="item in 50" :key="item">测试溢出滚动{{ item }}</div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue'

const feature = ref();
</script>

<style lang="css" scoped></style>