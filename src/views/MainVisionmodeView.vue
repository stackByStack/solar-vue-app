<template>
  <div>
    <canvas id="overallCanvas" ref="overallCanvas"></canvas>
    <canvas id="renderCanvas" ref="renderCanvas"></canvas>
    <canvas id="moonCanvas" ref="moonCanvas"></canvas>
    <video ref="video" autoplay preload="auto"></video>
    <video ref="video2" autoplay preload="auto"></video>
  </div>

  <div
    class="navbar"
    :class="{ 'navbar-hovered': showNavibar }"
    @mouseenter="showNavbar"
    @mouseleave="hideNavbar"
  >
    <div class="navbar-items">
      <div class="navbar-item" @mouseenter="showVisualTransformations">
        Visual Transformation
        <div class="navbar-dropdown" v-show="showVisualTransformationsDropdown">
          <ul>
            <li @click="changeSkin('satellite')">Satellite Map</li>
            <li @click="changeSkin('normal')">Normal Map</li>
          </ul>
        </div>
      </div>
      <div class="navbar-item">
        View Mode
        <div class="navbar-dropdown">
          <ul>
            <li>
              <router-link class="globalFont" to="/VerticalSideView"
                >Side&Vertical View</router-link
              >
            </li>
            <li>
              <router-link class="globalFont" to="/MainVisionmode"
                >3D Mode</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="navbar-item">
        Picture-in-Picture
        <div class="navbar-dropdown">
          <ul>
            <li @click="selectPicture('Sun Eclipse')">Sun Eclipse</li>
            <li @click="selectPicture('Moon Eclipse')">Moon Eclipse</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 将原有的CSS样式复制到这里 */
canvas {
  width: 100%;
  height: 95%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

#renderCanvas {
  display: none;
}

#moonCanvas {
  display: none;
}

button {
  color: black;
  font-display: block;
}

video {
  display: none;
}

@font-face {
  font-family: "Montserrat";
  /* Font name to use later */
  src: url("../assets/fonts/Montserrat-Light.ttf") format("truetype");
  /* URL to the TTF file */
  /* Add other font properties here if needed */
}

.navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 60px;
  /* opacity: 0.5; */
  background: rgba(0, 0, 0, 0);
  border-radius: 15px;
  position: fixed;
  top: 50px;
  left: 0;
  z-index: 3;
  align-items: center;
}

.navbar-items {
  display: flex;
  justify-content: center;
  color: white;
  font-size: 21px;
  font-family: Montserrat;
  background: rgba(0, 0, 0, 0);
  font-weight: 400;
  /* opacity: 0; */
  /* z-index: 3; */
  word-wrap: break-word;
  align-items: center;
}

.navbar-item {
  margin-right: 10px;
  justify-content: center;
  position: relative;
  align-items: center;
  margin-left: 30px;
  margin-right: 30px;
  /* opacity: 0; */
}

.navbar:hover .navbar-items {
  top: auto;
  justify-content: center;
  left: 10;
  margin: 15px;
}

/* .navbar-item {
    display: inline-block;
    margin-right: 10px;
    position: relative;
  } */

.navbar-icon {
  display: block;
  margin: 0 auto;
  padding: 15px;
  width: 25px;
  height: 25px;
  transform-origin: 0 0;
  background-image: url("../assets/home/right-arrow.png");
  z-index: 10;
  position: relative;
}

.navbar-dropdown {
  /* position: absolute;
    top: 20px;
    left: 0; */
  justify-content: center;
  display: none;
  z-index: 100;
}

.navbar-item:hover .navbar-dropdown {
  display: block;
  z-index: 100;
}

.navbar-dropdown ul {
  list-style-type: none;
  padding: 0;
  margin-top: 30px;
  position: relative;
}

.navbar-dropdown li {
  margin-top: 7px;
}

.navbar-dropdown ul {
  list-style-type: none;
  padding: 0;
}

.navbar-dropdown li {
  cursor: pointer;
  transition: font-size 0.5s;
}

.navbar-dropdown li:hover {
  font-size: 25px;
}

.globalFont:hover {
  font-size: 25px;
}

.globalFont {
  font-family: Montserrat;
  font-weight: 400;
  font-size: 22px;
  color: white;
  text-decoration: none;
  transition: font-size 0.5s;
}
</style>

<script>
import * as BABYLON from "babylonjs";
import "./MainVision/hand.js";
//import Vue from 'vue';
import MainVision from "./MainVision/MainVision.js";
import SunEclipse from "./MainVision/SunEclipse.js";
import MoonEclipse from "./MainVision/MoonEclipse.js";

export default {
  name: "MainVisionmodeView",
  components: {
    // HelloWorld
  },

  mainvisionInstance: MainVision,
  inThreeModeData: true,

  data: () => ({
    showNavibar: false,
    showVisualTransformationsDropdown: false,
  }),
  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      if (!BABYLON.Engine.isSupported()) {
        window.alert("Browser not supported");
      } else {
        // 初始化场景要素
        var canvas0 = this.$refs.overallCanvas;
        var canvas1 = this.$refs.renderCanvas;
        var canvas2 = this.$refs.moonCanvas;
        const engine0 = new BABYLON.WebGPUEngine(canvas0);
        await engine0.initAsync();
        var scene0 = new BABYLON.Scene(engine0);
        const engine1 = new BABYLON.WebGPUEngine(canvas1);
        await engine1.initAsync();
        var scene1 = new BABYLON.Scene(engine1);
        const engine2 = new BABYLON.WebGPUEngine(canvas2);
        await engine2.initAsync();
        var scene2 = new BABYLON.Scene(engine2);

        // 添加点击事件监听器

        // 配置相机
        var camera1 = new BABYLON.ArcRotateCamera(
          "camera1",
          0,
          0,
          10,
          BABYLON.Vector3.Zero(),
          scene1
        );
        camera1.attachControl(canvas1, true);

        var camera2 = new BABYLON.ArcRotateCamera(
          "camera2",
          0,
          0,
          10,
          BABYLON.Vector3.Zero(),
          scene2
        );
        camera2.attachControl(canvas2, true);

        var camera0 = new BABYLON.ArcRotateCamera(
          "ArcRotateCamera",
          -Math.PI / 4.0,
          0.25 * Math.PI,
          1.5,
          new BABYLON.Vector3(0, 0, 0),
          scene0
        );
        // Attach the camera to the canvas
        camera0.attachControl(canvas0, true);

        // 配置场景
        var mainvision = new MainVision(canvas0, engine0, scene0, camera0);
        var suneclipse = new SunEclipse(canvas1, engine1, scene1, camera1);
        var mooneclipse = new MoonEclipse(canvas2, engine2, scene2, camera2);
        mainvision.Building();
        suneclipse.Building();
        mooneclipse.Building();

        // 将canvas转换为video
        const video = this.$refs.video;
        const video2 = this.$refs.video2;

        // Create a MediaStream object from the canvas
        const stream = canvas1.captureStream();
        const stream2 = canvas2.captureStream();

        // Create a new MediaRecorder instance for recording video
        const recorder = new MediaRecorder(stream);
        const recorder2 = new MediaRecorder(stream2);

        // Create an array to store the recorded video chunks
        var chunks = [];
        var chunks2 = [];

        // Listen for dataavailable event which is triggered when a video chunk is available
        recorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });
        recorder2.addEventListener("dataavailable", (event) => {
          chunks2.push(event.data);
        });

        // Listen for stop event which is triggered when recording has stopped
        recorder.addEventListener("stop", () => {});
        recorder2.addEventListener("stop", () => {});

        // Start recording the canvas
        recorder.start();
        recorder2.start();

        // Stop recording after 5 seconds (adjust this according to your needs)
        setInterval(() => {
          // Create a Blob object from the recorded chunks
          const blob = new Blob(chunks, { type: "video/webm" });
          recorder.stop();
          // Set the source of the video element to the recorded video
          const videoURL = URL.createObjectURL(blob);
          video.src = videoURL;
          chunks = [];
          recorder.start();
        }, 50);
        setInterval(() => {
          // Create a Blob object from the recorded chunks
          const blob = new Blob(chunks2, { type: "video/webm" });
          recorder2.stop();
          // Set the source of the video element to the recorded video
          const videoURL = URL.createObjectURL(blob);
          video2.src = videoURL;
          chunks2 = [];
          recorder2.start();
        }, 50);

        
        // setUpCameraMovingPattern(camera0, scene0);

        // Resize
        window.addEventListener("resize", function () {
          engine0.resize();
        });

        this.mainvisionInstance = mainvision;
      }
    },
    showNavbar() {
      this.showNavibar = true;
    },

    hideNavbar() {
      this.showNavibar = false;
    },

    showVisualTransformations() {
      this.showVisualTransformationsDropdown = true;
    },

    changeSkin(str) {
      // if(!this.inThreeModeData) {
      //   alert("Please switch to 3D mode first!");
      // }
      // else
      {
        this.mainvisionInstance.changeSkin(str);
      }
    },
    selectPicture(picture) {
      // Invoke your callback here with the selected picture
      console.log("Selected Picture:", picture);
      if (picture == "Sun Eclipse") {
        this.$refs.video
          .requestPictureInPicture()
          .then(() => {
            // 成功进入画中画模式
          })
          .catch((error) => {
            // 处理错误
            console.error("Failed to enter picture-in-picture mode:", error);
          });
      } else if (picture == "Moon Eclipse") {
        this.$refs.video2
          .requestPictureInPicture()
          .then(() => {
            // 成功进入画中画模式
          })
          .catch((error) => {
            // 处理错误
            console.error("Failed to enter picture-in-picture mode:", error);
          });
      }
    },
  },

  computed: {
    mainvision() {
      return this.$store.state.mainvision;
    },
    inThreeMode() {
      return this.$store.state.inThreeMode;
    },
  },
};
</script>
