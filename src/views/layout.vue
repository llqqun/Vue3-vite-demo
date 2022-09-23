<template>
    <div class="war">
        <div class="menus">
            <el-menu
                :default-active="daRoute"
                class="el-menu-vertical-demo"
                router
                :collapse="false"
            >
                <el-menu-item
                    v-for="(item, index) in menus"
                    :key="index"
                    :index="'/' + item.path"
                    >{{ item.meta && item.meta.title }}</el-menu-item
                >
            </el-menu>
        </div>

        <div class="main router-view">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { menus } from '@/router';
const route = useRoute();
const pageData = reactive({
    daRoute: '',
});
const { daRoute } = toRefs(pageData);
watchEffect(() => {
    pageData.daRoute = route.fullPath;
});
</script>

<style scoped lang="less">
.war {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-flow: row nowrap;
}
.menus {
    width: 200px;
}
.main {
    flex: 1;
    overflow: hidden;
}
.router-view {
    height: 100%;
    overflow-y: auto;
}
.el-menu-vertical-demo {
    height: 100vh;
}
</style>
