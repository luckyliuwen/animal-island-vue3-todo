<template>
    <SearchForm @search="handleSearch" />
    <div class="my-card">
        <div>
            <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%" max-height="420">
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="name" label="用户名" />
            <el-table-column prop="gender" label="性别">
                <template #default="scope">
                    <el-tag :type="scope.row.gender == 0 ? 'danger' : scope.row.gender == 1 ? 'success' : 'info'">
                        {{ scope.row.gender == 0 ? '女' : scope.row.gender == 1 ? '男' : '未知' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column prop="createTime" label="创建时间" width="200" />
            <el-table-column prop="updateTime" label="更新时间" width="200" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-tooltip class="box-item" effect="dark" content="编辑" placement="top">
                        <el-button type="primary" size="small" link @click="handleEdit(scope.row)">
                            <el-icon>
                                <Edit />
                            </el-icon>
                        </el-button>
                    </el-tooltip>

                    <el-popconfirm title="确定要删除吗？" @confirm="handleDelete(scope.row.id)" @cancel="handleCancel"
                        placement="top">
                        <template #reference>
                            <!-- 关键：用 span 包裹 el-tooltip -->
                            <span>
                                <el-tooltip content="删除" placement="top">
                                    <el-button type="danger" link>
                                        <el-icon>
                                            <Delete />
                                        </el-icon>
                                    </el-button>
                                </el-tooltip>
                            </span>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex justify-end">
            <el-pagination layout="total,prev, pager, next" :total="pagination.total" :page-size="pagination.pageSize"
                v-model:current-page="pagination.pageNum" @current-change="fetchUserByPage" />
        </div>
    </div>

    <UserDialog :dialogData="dialogData" @confirm="fetchUserData" />
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { getAllUser, deleteUser, getUserList } from '@/api/user';
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue'
import UserDialog from './UserDialog.vue';
import SearchForm from './Search.vue';
const tableData = ref([])

// 搜索表单数据
const searchForm = reactive({
    name: '',
})

// 分页数据
const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
})


// 定义新增用户、编辑用户弹窗数据
const dialogData = reactive({
    title: '新增用户',
    action: "add",
    dialogFormVisible: false,
    form: {
        name: '',
        age: '',
        email: ''
    }
})

onMounted(() => {
    fetchUserByPage()
})

// 定义获取数据的方法
const fetchUserData = async () => {
    try {
        // 调用封装好的 API，并传入参数
        const res = await getAllUser();
        tableData.value = res.data;
    } catch (error) {
        // 错误已在拦截器中处理，这里只需处理业务逻辑错误
        console.error('获取用户信息失败:', error);
    }
};

const fetchUserByPage = async () => {
    tableData.value = []
    try {
        // 调用封装好的 API，并传入参数
        const res = await getUserList({
            pageNum: pagination.pageNum,
            pageSize: pagination.pageSize,
            name: searchForm.name
        });
        tableData.value = res.data.records;
        pagination.total = res.data.total;
    } catch (error) {
        // 错误已在拦截器中处理，这里只需处理业务逻辑错误
        console.error('获取用户列表失败:', error);
    }
}

// 定义删除用户的方法
const handleDelete = async (id) => {
    try {
        // 调用封装好的 API，并传入参数
        const res = await deleteUser(id);
        // 刷新数据
        fetchUserData();
    } catch (error) {
        // 错误已在拦截器中处理，这里只需处理业务逻辑错误
        console.error('删除用户失败:', error);
    }
};

const handleCancel = () => {
    console.log('取消删除操作');
}

// 定义新增用户的方法
const handleAdd = () => {
    dialogData.title = '新增用户';
    dialogData.action = "add"
    dialogData.dialogFormVisible = true;
    dialogData.form = {
        id: '',
        name: '',
        gender: 2,// 0女 1男 2未知
        age: '',
        email: ''
    };
}

// 定义编辑用户的方法
const handleEdit = async (row) => {
    dialogData.title = '编辑用户';
    dialogData.action = "edit"
    dialogData.dialogFormVisible = true;
    // 等弹窗DOM、表单渲染挂载完成后再赋值回显，解决elementplus form 编辑，重置问题
    await nextTick()
    dialogData.form = {
        id: row.id,
        name: row.name,
        gender: row.gender,
        age: row.age,
        email: row.email
    };
}

const handleSearch = (name) => {
    console.log(name)
    searchForm.name = name
    fetchUserByPage()
}
</script>


<style scoped lang="scss"></style>
