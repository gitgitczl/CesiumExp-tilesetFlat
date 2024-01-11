# Cesium模型分析插件
### 此插件包含模型压平、模型裁剪、模型剖切以及模型编辑方法
### [在线体验地址1（三维框架内）](http://mapgl.com/shareCode/#/PopupTooltip?downUrl=)
### [在线体验地址2](http://mapgl.com/shareCode/#/Plot?downUrl=)
gitee：
github：

ps：如果可以的话，希望大家能给我个star，好让我有更新下去的动力；

***

实现原理：<br/>
- 模型压平、裁剪主要是利用了模型的customShader来实现的。模型压平修改了顶点着色器中顶点坐标的计算，模型裁剪修改了片元的显示，这个要求对着色器有基础的理解。  
- 模型剖切是用了Cesium官方提供的ClippingPlaneCollection这个类；模型编辑核心是修改了模型的模型矩阵，根据不同操作来来设置模型的变换矩阵，这个要求要对图形学有一定的了解。
- 
***
其它：     
qq群：606645466（GIS之家共享交流群）

[更多案例地址](http://mapgl.com/shareCode/)&nbsp;&nbsp;&nbsp; [更多免费数据](http://mapgl.com/shareData/)&nbsp;&nbsp;&nbsp; [开发文档说明](http://mapgl.com/3dapi/)   

[其它源码下载（标绘、量算、动态材质、漫游、地图分析等）](http://mapgl.com/introduce/)
