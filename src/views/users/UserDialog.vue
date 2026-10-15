<template>
    <el-dialog v-model="props.dialogData.dialogFormVisible" :title="props.dialogData.title" width="500">
        <el-form :label-width="formLabelWidth" :model="props.dialogData.form" ref="formRef">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="props.dialogData.form.name" autocomplete="off"
                    :disabled="props.dialogData.action == 'edit'" />
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="props.dialogData.form.gender" clearable>
                    <el-option label="女" :value="0" />
                    <el-option label="男" :value="1" />
                    <el-option label="未知" :value="2" />
                </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="props.dialogData.form.age" autocomplete="off" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="props.dialogData.form.email" autocomplete="off" />
            </el-form-item>

        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="resetForm(formRef)">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { addUser, updateUser } from '@/api/user';
// 定义可触发的事件
const emit = defineEmits(['confirm'])
const formRef = ref()
const formLabelWidth = '80px'
const props = defineProps({
    dialogData: {
        type: Object,
        default: () => ({})
    }
})
onMounted(() => {
})


const handleConfirm = async () => {
    const { action, form } = props.dialogData
    let res;
    if (action == "add") {
        res = await addUser(form)
    } else if (action == "edit") {
        res = await updateUser(form)
    }

    if (res.code === 200) {
        resetForm(formRef.value)
        emit('confirm')
    }

}

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    //新增用户后，关闭弹窗
    props.dialogData.dialogFormVisible = false
}
</script>
