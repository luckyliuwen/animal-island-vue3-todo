<template>
    <el-aside width="200px">
        <el-scrollbar>
            <el-menu :router="true" :default-active="activeIndex">
                <el-sub-menu v-for="item in menuList" :key="item.index" :index="item.index">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon" />
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <el-menu-item v-for="child in item.children" :key="child.index" :index="child.index">
                        <el-icon>
                            <component :is="child.icon" />
                        </el-icon>
                        <span>{{ child.title }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </el-aside>


</template>

<script setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const activeIndex = ref(router.currentRoute.value.path)

const menuList = [
    {
        index: '/home/user',
        title: '用户管理',
        icon: IconMenu,
        children: [
            {
                index: '/home/user/list',
                title: '用户列表',
                icon: Message,
            },
        ],
    },
    {
        index: '/news',
        title: '新闻管理',
        icon: IconMenu,
        children: [
            {
                index: '/news/category',
                title: '新闻分类',
                icon: Message,
            },
            {
                index: '/news/list',
                title: '新闻列表',
                icon: Setting,
            }
        ],
    },

]

</script>

<style scoped lang="scss">
.el-aside {
    color: var(--el-text-color-primary);
    // background: var(--el-color-primary-light-8);
    background: #fff;
}

.el-menu {
    border-right: none;
}
</style>
