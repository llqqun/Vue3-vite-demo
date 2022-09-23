<template>
    <div>
        <h2>微信盗链图片显示</h2>
        <img
            class="rich_pages wxw-img"
            width="100%"
            src="https://mmbiz.qpic.cn/mmbiz_png/5yswFhp6VBU6FP3oumkHW3lWyuoQrcWY44bsJZojO4w9rBagib0VUZ3ftnh8qSyDGAQpf2hmRibxI5tHXf7wibsBA/640?wx_fmt=png"
            alt="图片"
        />
        <img src="http://zjjbk.hn-xinhua.cn/imgupload/202208/6379531239478150005916477.png" />
        <img :src="imgRequest('../assets/images/icon.png')" alt="">
        <div>
            <input v-model="inputVal" type="text" />
            span: <span>{{ inputVal }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
let inputVal = ref(0);
onMounted(() => {});
let imgRequest: (url: string) => string = (url) => {
    if (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('//')) {
        return url
    } else if (url) {
        const path = new URL(url, import.meta.url).href
        return path
    }
    return url
}
</script>

<style scoped lang="less">
.wxw-img {
    width: 200px;
    height: 200px;
    object-fit: contain;
}
</style>
