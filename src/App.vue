<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  console.log(
    '首屏时间:' +
      (window.performance.timing.domInteractive - window.performance.timing.navigationStart)
  );
  console.log(
    '白屏时间:' + (window.performance.timing.domLoading - window.performance.timing.navigationStart)
  );
  console.log('开发参数', import.meta.env);
  let loadDOM: HTMLDivElement | null = document.querySelector('#apploading');
  if (loadDOM) {
    setTimeout(() => {
      document.body.removeChild(loadDOM!);
      loadDOM = null;
    }, 1500);
    console.log('1');
  }
});
</script>

<template>
  <RouterView />
</template>

<style scoped lang="less"></style>
