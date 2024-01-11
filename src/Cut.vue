<template>
    <div id="mapContainer"></div>
    <div class="toolbar">
        <a-button class="toolbar-btn" type="primary" @click="start">开始绘制</a-button>
        <a-button class="toolbar-btn" type="primary" danger @click="clear">清除</a-button>
    </div>
    <div style="position: absolute;bottom: 0px;right: 10px;">
        <p style="font-weight: bold;color: red;font-size: 18px;">模型裁剪，支持多区域裁剪，支持凹多边形裁剪。</p>
    </div>
</template>
<script setup lang="ts">
/* 模型压平 */
import { onMounted } from "vue";
import Tool from "./js/plot/drawTool.js"
import { Cut } from "./js/tileset/export.js"
let viewer: any = undefined;
let tileset: any = undefined;
let drawTool: any = undefined;
let cutTool: any = undefined;
onMounted(() => {
    // 构建viewer
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

    // 加载测试模型
    let tset = Cesium.Cesium3DTileset.fromUrl("http://mapgl.com/data/model/qx-simiao/tileset.json", {
        maximumScreenSpaceError: 1
    });

    let changeH = 80;
    tset.then(function (tst: any) {
        tileset = tst;
        viewer.scene.primitives.add(tileset);
        viewer.zoomTo(tileset);
        var cartographic = Cesium.Cartographic.fromCartesian(tileset.boundingSphere.center);
        var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
        var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, changeH);
        var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
        tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation.clone());
    });

});
const start = () => {
    if (!tileset) return;

    if (!drawTool) {
        drawTool = new Tool(viewer, {
            canEdit: false,
        });
    }

    if (!cutTool) {
        cutTool = new Cut(tileset, {
            iscutOutter: false, // 内部裁剪还是外部裁剪
        });
    }

    drawTool.start({
        type: "polygon",
        style: {
            heightReference: 1,
            fill: false,
            outline: true,
            outlineColor: "#ff0000"
        },
        success: function (entObj: any, ent: any) {
            let positions = entObj.getPositions();

            cutTool.addRegion(positions, 0);
            drawTool.removeAll();
        }
    })
}

const clear = () => {
    if (cutTool) cutTool.destroy();
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
  