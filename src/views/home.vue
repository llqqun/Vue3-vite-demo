<template>
  <div class="content">
    <div style="display: inline-block">
      <img :src="imgurl" alt="" />
      <p>图片引入1</p>
    </div>
    <div style="display: inline-block">
      <img src="/1.png" alt="" />
      <p>图片引入2</p>
    </div>
    <el-row>
      <el-button @click="demoRequest">发送请求</el-button>
      <el-button @click="demoPromise">Prosime</el-button>
    </el-row>
    <el-row>
      <div>color BUG input输入框中文被禁</div>
      <input type="text" />
      <input style="margin-left: 10px" type="color" />
    </el-row>
    <hello-world :count="5"></hello-world>
  </div>
</template>

<script setup lang="ts">
// import { reactive, toRefs, onMounted } from 'vue';
import { initLocalStorage } from '@/utils';
import imgurl from '../assets/images/icon.png';
import server from '@/utils/http';
import PromiseA from '@/utils/PromiseA';
const pageData = reactive({
  circleUrl: '',
});
const { circleUrl } = toRefs(pageData);
onMounted(() => {
  // console.log(useFoo());
  initLocalStorage();
  localStorage.setItem('demo', '11223');

  console.log('=====自定义Promise测试======');
  // let aa = PromiseA.all([
  //   PromiseA.resolve(1),
  //   new PromiseA((res: any) => {
  //     setTimeout(() => {
  //       res(2);
  //     }, 1300);
  //   }),
  //   PromiseA.resolve(3).then((val: any) => {
  //     setTimeout(() => {
  //       return val;
  //     }, 1500);
  //   }),
  // ]);
  // console.log(aa);
  const p1 = new PromiseA((res: (arg: any) => void) => {
    console.log(0);
    setTimeout(() => {
      console.log(1);
      res('ok');
    }, 1000);
    console.log('!');
  });
  p1.then((val: any) => {
    console.log(2);
    return val;
  });
  console.log(p1);
});
const demoRequest = () => {
  let start = server.get('/api/productlist?siteid=1').then((res) => {
    console.log(res);
  });
  console.log(start);
};
const demoPromise = () => {
  let str = promiseFun();
  console.log(str);
};
async function promiseFun() {
  let obj = await new Promise((resolve, reject) => {
    console.log('新建Promise');
    resolve('ok');
    return 'load';
  });
  return obj;
}
</script>

<style scoped lang="less"></style>
