# 3dtiles模型压平

[在线体验](http://mapgl.com/3d/)

gitee：https://gitee.com/caozl1132/CesiumExp-tilesetFlat
github：https://github.com/gitgitczl/CesiumExp-tilesetFlat

ps：如果可以的话，希望大家能给我个star，好让我有更新下去的动力；

***
实现原理：<br/>
- 模型压平、裁剪主要是利用了模型的customShader来实现的。模型压平修改了顶点着色器中顶点坐标的计算，模型裁剪修改了片元的显示，这个要求对着色器有基础的理解。  
- 模型剖切是用了Cesium官方提供的ClippingPlaneCollection这个类；模型编辑核心是修改了模型的模型矩阵，根据不同操作来来设置模型的变换矩阵，这个要求要对图形学有一定的了解。
***
其它：     

目前基于Cesium的三维类库vis3d.js已初步整理完毕并完全开源，vis3d.js中包含模型压平、可视域分析、模型裁剪、军事标绘等数十种功能，并且基于vis3d.js开发了一套三维平台vis3d-ui-vue2，也完全开源给大家使用，以下是三维类库及平台的地址：

1. vis3d-ui-vue2地址：  
https://github.com/gitgitczl/vis3d-ui-vue2  
https://gitee.com/caozl1132/vis3d-ui-vue2

2. 相关文档地址：
http://mapgl.com/vis3d/

[更多案例地址](http://mapgl.com/shareCode/)  
[更多免费数据](http://mapgl.com/shareData/)  
[开发文档说明](http://mapgl.com/3dapi/)   
qq群：606645466（GIS之家共享交流群）