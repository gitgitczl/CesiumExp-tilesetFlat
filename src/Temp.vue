<template>
    <div id="mapContainer"></div>
</template>
<script setup lang="ts">
import { ref, watch, reactive, toRefs, onMounted } from "vue";
import Tool from "./js/plot/drawTool.js"
import util from "./js/util.js";
let viewer = undefined;

let plotDrawTool = undefined;
onMounted(() => {

    viewer = new Cesium.Viewer('mapContainer', {
        animation: false,  // 设置动画小组件关闭展示
        timeline: false, // 时间轴关闭展示
        infoBox: false, // 信息盒子关闭展示
        geocoder: false, // 地理编码搜索关闭展示
        baseLayerPicker: false, // 基础图层选择器关闭展示
        sceneModePicker: false, // 场景选择器关闭展示
        fullscreenButton: false, // 全屏按钮关闭展示
        navigationInstructionsInitiallyVisible: false, // 导航说明是否最初展示
        navigationHelpButton: false, // 导航帮助按钮关闭展示
        homeButton: false
    });
    viewer.scene.imageryLayers.removeAll();
    const tp = Cesium.CesiumTerrainProvider.fromUrl("http://data.marsgis.cn/terrain");
    tp.then(terrainProvider => {
        viewer.terrainProvider = terrainProvider;
    })
    const imageryProvider = Cesium.ArcGisMapServerImageryProvider.fromUrl("https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer");
    imageryProvider.then(ipvd => {
        const layer = new Cesium.ImageryLayer(ipvd);
        viewer.scene.imageryLayers.add(layer);
    })


    document.getElementsByClassName("cesium-viewer-bottom")[0].style.display = "none";

    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    );
    util.setCameraView({
        "x": 116.30737298856594,
        "y": 31.157848537028933,
        "z": 1716.1274826753247,
        "heading": 248.7107277792296,
        "pitch": -20.656432783262787,
        "roll": 359.99918274478455,
        "duration": 0
    }, viewer);

    plotDrawTool = new Tool(viewer, {
        canEdit: true,
    });

});
const start = (item: any) => {
    item = JSON.parse(JSON.stringify(item)); // 数据隔离
    if (!plotDrawTool) return;
    plotDrawTool.start({
        "name": "面",
        "type": "polygon",
        "iconImg": "./easy3d/images/plot/polygon.png",
        "styleType": "polygon",
        "style": {
            "color": "#00FFFF",
            "colorAlpha": 0.3,
            "outline": true,
            "outlineColor": "#ff0000",
            "heightReference": 1
        }
    });
}

const clear = () => {
    if (!plotDrawTool) return;
    plotDrawTool.removeAll();
}
</script>

<style scoped>
#mapContainer {
    height: 100%;
    margin: 0;
    padding: 0;
}

.toolbar {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 99;
}

.toolbar-btn {
    margin: 10px;
}
</style>
  