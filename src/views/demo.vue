<template>
  <div class="content">
    <h1>视频摄像头截图</h1>
    <el-row>
      <el-button type="primary" @click="closeVideo">关闭视频</el-button>
      <el-button type="primary" @click="openVideo">打开视频</el-button>
      <el-button type="primary" @click="cutOutVideoImg">截取视频</el-button>
    </el-row>
    <el-row>
      <video id="demo-video" ref="testVideo" @canplay="setout">
        Sorry, your browser doesn't support embedded videos.
      </video>
      <img ref="screenshot" id="screenshot" src="" alt="" />
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, toRefs } from 'vue';
import { demoData } from '@/types/classList';
let pageData = reactive(new demoData());
const { testVideo, screenshot } = { ...toRefs(pageData) };

const setout = function (e: Event) {
  const videoDom = e.target as HTMLVideoElement;
  pageData.testVideo.width = videoDom.videoWidth;
  pageData.testVideo.height = videoDom.videoHeight;
};
const openVideo = () => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: { facingMode: 'user' },
    })
    .then((stream) => {
      pageData.videoStream = stream;
      if (!pageData.testVideo) {
        return false;
      }
      if ('srcObject' in pageData.testVideo) {
        pageData.testVideo.srcObject = stream;
      } else {
        pageData.testVideo.src = window.URL.createObjectURL(stream as any);
      }
      pageData.testVideo.onloadedmetadata = () => {
        pageData.testVideo.play();
      };
    })
    .catch((error) => {
      console.log(error);
      alert(error);
    });
};
const closeVideo = () => {
  if (!pageData.videoStream) return false;
  let mst = pageData.videoStream?.getVideoTracks()[0];
  mst.stop();
  pageData.videoStream?.removeTrack(mst);
  pageData.testVideo.src = '';
};

const cutOutVideoImg = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = pageData.testVideo.width;
  canvas.height = pageData.testVideo.height;
  ctx?.drawImage(pageData.testVideo, 0, 0);
  let url = canvas.toDataURL('image/png', 1);
  console.log(pageData.screenshot);
  // let img = new Image();
  // img.src = url;
  // img.width = 300;
  // img.height = 200;
  // pageData.testVideo.parentElement.appendChild(img);
  if (pageData.screenshot) {
    pageData.screenshot.src = url;
  }
  // let link = document.createElement('a');
  // link.href = url;
  // link.download = '视频截图.png';
  // link.click();
  // link.remove();
  canvas.remove();
};
const cutOutImg = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const images = document.getElementById('img') as HTMLImageElement;
  canvas.width = images.width;
  canvas.height = images.height;
  ctx?.drawImage(images, 0, 0);
  let url = canvas.toDataURL('image/png', 1);
  let link = document.createElement('a');
  link.href = url;
  link.download = '截图.png';
  link.click();
  link.remove();
  canvas.remove();
};
</script>

<style scoped lang="less">
#demo-video,
#screenshot {
  width: 300px;
  height: 250px;
}
</style>
