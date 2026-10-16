<template>
    <div class="h-full" style="position: relative;">
        <!-- 作为内容区块的背景容器 -->
        <Background :type="bgType">
            <div style="position: absolute;right: 20px;top: 20px;">
                切换主题 ✨
                <!-- 背景主题选择器 -->
                <Select v-model="bgType" :options="options" />
            </div>
            <slot />
        </Background>
        <!-- 基础用法 — 右下角钱袋返回顶部 -->
        <BackTop :visibilityHeight="40" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Background, BackTop, Select, type BackgroundType } from 'animal-island-vue';

// 当前背景主题
const bgType = ref<BackgroundType>('sprinkles');

// 可选背景主题
const options = [
    { key: 'default', label: '奶油色波点（默认）' },
    { key: 'sprinkles', label: '彩色针糖' },
    { key: 'sweet-corner', label: '甜点街角' },
    { key: 'coffee-break', label: '咖啡时光' },
    { key: 'grid', label: '网格' },
    { key: 'dots-dark-green', label: '深绿波点' },
    { key: 'dots-pink', label: '应用粉' },
    { key: 'dots-purple', label: '紫色' },
    { key: 'dots-blue', label: '应用蓝' },
    { key: 'dots-yellow', label: '应用黄' },
    { key: 'dots-orange', label: '应用橙' },
    { key: 'dots-teal', label: '应用青' },
    { key: 'dots-green', label: '应用绿' },
    { key: 'dots-red', label: '应用红' },
    { key: 'dots-lime-green', label: '青柠绿' },
    { key: 'dots-yellow-green', label: '黄绿色' },
    { key: 'dots-brown', label: '棕色' },
    { key: 'dots-warm-peach-pink', label: '暖桃粉' },
];
</script>
