<template>
    <div class="w-200 mx-auto pt-5">
        <div class="flex gap-3">
            <Select v-model="selectedCategory" :options="categoryOptions" class="w-32 category-select" />
            <Input class="flex-1" v-model="addTodo" placeholder="请输入待办事项" :shadow="true" size="large" prefix="➕"
                suffix="⏎" @keydown.enter="addTodoItem" />
        </div>
        <Tabs v-model="activeTab" :items="tabItems" :shadow="true" class="mt-5" aria-label="待办分类页签">
            <template #todo>
                <Card v-for="item in pendingList" :key="item.todoObj.value" pattern="app-orange"
                    class="mt-5 flex justify-between items-center">
                    <Checkbox v-model="checkedList"
                        :options="[{ label: item.todoObj.label, value: item.todoObj.value }]" direction="vertical" />
                    <div>
                        <Tag :color="item.tagObj.color" class="mr-3">{{ item.tagObj.text }}</Tag>
                        <Button type="primary" danger size="small" @click="openDelete(item)">删除</Button>
                    </div>
                </Card>
                <p v-if="!pendingList.length" class="mt-5 text-center text-stone-400">暂无待办，快去添加吧～</p>
            </template>
            <template #done>
                <Card v-for="item in doneList" :key="item.todoObj.value" pattern="app-orange"
                    class="mt-5 flex justify-between items-center">
                    <Checkbox v-model="checkedList"
                        :options="[{ label: item.todoObj.label, value: item.todoObj.value }]" direction="vertical" />
                    <div>
                        <Tag :color="item.tagObj.color" class="mr-3">{{ item.tagObj.text }}</Tag>
                        <Button type="primary" danger size="small" @click="openDelete(item)">删除</Button>
                    </div>
                </Card>
                <p v-if="!doneList.length" class="mt-5 text-center text-stone-400">暂无已办事项</p>
            </template>
        </Tabs>
    </div>
    <!-- 自定义 footer -->
    <Modal v-model:open="open" title="确认删除待办么？" :typewriter="false">
        {{ currentItem?.todoObj.label }}
        <template #footer>
            <Button @click="open = false">取消删除</Button>
            <Button type="primary" danger @click="handleDelete">确认删除</Button>
        </template>
    </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import {
    Button, Modal, Tabs,
    Select, Input, Tag, Checkbox, type CheckboxValue, type TagColor, type TabItem, Card
} from 'animal-island-vue';

interface TodoItem {
    todoObj: { label: string; value: CheckboxValue };
    tagObj: { color: TagColor; text: string };
}

type TodoCategoryKey = 'life' | 'work' | 'study' | 'other';

// 分类 -> Tag 颜色映射
const CATEGORIES: Record<TodoCategoryKey, { color: TagColor; text: string }> = {
    life: { color: 'app-pink', text: '生活' },
    work: { color: 'app-teal', text: '工作' },
    study: { color: 'app-blue', text: '学习' },
    other: { color: 'app-yellow', text: '其他' },
};

const categoryOptions: { key: TodoCategoryKey; label: string }[] = [
    { key: 'life', label: '生活' },
    { key: 'work', label: '工作' },
    { key: 'study', label: '学习' },
    { key: 'other', label: '其他' },
];

const STORAGE_KEY = 'animal-todo-list';

const defaultTodos: TodoItem[] = [];

function loadTodos(): TodoItem[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) ? parsed : defaultTodos;
    } catch {
        return defaultTodos;
    }
}

const addTodo = ref('');
const selectedCategory = ref<TodoCategoryKey>('life');
const currentItem = ref<TodoItem>();
const open = ref(false);
const checkedList = ref<CheckboxValue[]>([]);
const todoList = ref<TodoItem[]>(loadTodos());

// 页签：待办 / 已办（按勾选状态划分）
const activeTab = ref('todo');
const tabItems: TabItem[] = [
    { key: 'todo', label: '待办' },
    { key: 'done', label: '已办' },
];
const pendingList = computed(() => todoList.value.filter(item => !checkedList.value.includes(item.todoObj.value)));
const doneList = computed(() => todoList.value.filter(item => checkedList.value.includes(item.todoObj.value)));

// 列表变化时持久化到 localStorage
watch(todoList, (list) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}, { deep: true });

const addTodoItem = () => {
    const text = addTodo.value.trim();
    if (!text) return;
    todoList.value.push({
        todoObj: { label: text, value: crypto.randomUUID() },
        tagObj: { ...CATEGORIES[selectedCategory.value] },
    });
    addTodo.value = '';
};

const openDelete = (item: TodoItem) => {
    currentItem.value = item;
    open.value = true;
}

const handleDelete = () => {
    if (!currentItem.value) return;
    const value = currentItem.value.todoObj.value;
    todoList.value = todoList.value.filter(item => item.todoObj.value !== value);
    checkedList.value = checkedList.value.filter(v => v !== value);
    currentItem.value = undefined;
    open.value = false;
}
</script>

<style scoped>
:deep(.animal-checkbox--checked .animal-checkbox__label) {
    text-decoration: line-through;
    text-decoration-color: rgba(0, 0, 0, 0.45);
}

/* 分类 Select 对齐 large Input：48px 高、同款下移阴影、胶囊圆角 */
:deep(.category-select .animal-select__trigger) {
    box-sizing: border-box;
    height: 48px;
    padding: 0 13px;
    border-radius: 50px;
    box-shadow: 0 4px #d4c9b4;
}

:deep(.category-select .animal-select__value) {
    font-size: 16px;
}
</style>
