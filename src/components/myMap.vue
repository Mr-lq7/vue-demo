<template>
	<div id = 'mapContainer'>
	</div>


  <!-- <div>
    <el-amap
      :center='center'
      :zoom='zoom'
      :events='mapEvents'
    >
      <el-amap-marker 
        :position="center"
        :label="label"
      ></el-amap-marker>

    </el-amap>
  </div> -->

</template>

<script>

import MapLoader from '../plugins/amap.js';
import DataHeap from '../util/heatmapData.js';
export default {
  //data就是定义的变量,methods就是对应的js函数
  name: 'myMap',
  
  data() {
    return {
      map: null,
      heatmap: null,
      center: [116.397428, 39.90923],
      zoom: 5,
      label:{
        content: '自定义标题',
        offset:[10,12]
      },

      mapEvents: {
        init(o) {
          o.setMapStyle("amap://styles/30fb00d596d825ec866dfaee1434d314")
        }
      }
    };
  },

  mounted() {//页面初始化方法
    let that = this;
    that.initMap();

    that.paintMap();

  //mapbox地图
        // var url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
        // let map = S.map('mapContainer').setView([41, 123], 5); //map对象
        // // this.map = map; //data上需要挂载
        // // window.map = map;
      
        // var baseLayer = L.tileLayer(url, {
        //     maxZoom: 10,
        //     minZoom:3,
        //     // id: 'mapbox/streets-v11', //图层样式 mapbox styles
        //     id: 'mapbox/light-v10',
        //     attribution: 'balbalba',
        //     tileSize: 512,
        //     zoomOffset: -1,
        //     accessToken: 'pk.eyJ1IjoibXJscSIsImEiOiJja2swczRxcmcwOG9sMnZwajViaXZubzFkIn0.1__kfGBBMBbzBX_8HH7opg'
        // }).addTo(map);
        // this.map = map;

    // // this.map = initMap();

    // let map = L.map("mapContainer", {
         
    //                       center: [37.005646, 114.52044],
    //                       zoom: 5,
    //                       zoomDelta: 0.5,
    //                       fullscreenControl: false,
    //                       zoomControl: true,
    //                       attributionControl: false
    //                     });
                
    //             //http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}//arcgis在线地图
    //             var baseLayer=L.tileLayer("http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",{
    //                     attribution: '&copy; 高德地图',
    //                     maxZoom: 18,
    //                     minZoom: 1,
    //                     subdomains: "1234"
    //                 });
    //             map.addLayer(baseLayer);
    //             var circle = L.circle([37.508, 114.11], {
    //               color: 'red',
    //               fillColor: '#f03',
    //               fillOpacity: 0.5,
    //               radius: 50000
    //           });
    //           circle.addTo(map);
    //           circle.bindPopup('ammmm');
    //             var polygon = L.polygon([
    //                 [51.509, -0.08],
    //                 [51.503, -0.06],
    //                 [51.51, -0.047]
    //             ]);
    //             polygon.addTo(map);
    //             polygon.bindPopup("I am a polygon.");

    //             this.map = map;

    //标点

    //高德地图
        // var url1 = 'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';
        // //let map = L.map('mapContainer').setView([41, 123], 5); //map对象
        // // this.map = map; //data上需要挂载
        // // window.map = map;
        // let map = L.map("mapContainer", {
        //                 minZoom: 10,
        //                 maxZoom: 15,
        //                 center: [37.005646, 114.52044],
        //                 zoom: 11,
        //                 zoomDelta: 0.5,
        //                 fullscreenControl: false,
        //                 zoomControl: false,
        //                 attributionControl: false
        //               });
        // var baseLayer = L.tileLayer(url1, {
        //     maxZoom: 10,
        //     minZoom:3,
        //     // id: 'mapbox/streets-v11', //图层样式 mapbox styles
        //     //id: 'mapbox/light-v10',
        //     attribution: 'balbalba'
        //     //tileSize: 512,
        //     //zoomOffset: -1
        // });
        // map.addLayer(baseLayer);
        // this.map = map;  

// 下面用高德地图api进行工作
        // this.amap = new VueAMap.Map("mapContainer", {
        //   zoom: 11,
        //   zooms: [3, 20],
        //   expandZoomRange: true //当expandZoomRange为true时，zooms的最大级别在PC上可以扩大到20级
        // });



  // var map = new VueAMap.Map('mapContainer', {
  //     zoom:11,//级别
  //     center: [116.397428, 39.90923],//中心点坐标
  // });
  // map.setMapStyle('white')
  // //map.setMapStyle('amap://styles/30fb00d596d825ec866dfaee1434d314')

  // var lineArr = [
  //       [116.368904, 39.913423],
  //       [116.382122, 39.901176],
  //       [116.387271, 39.912501],
  //       [116.398258, 39.904600]
  //   ];
  // var polyline = new VueAMap.Polyline({
  //       path: lineArr,          //设置线覆盖物路径
  //       strokeColor: "#3366FF", //线颜色
  //       strokeWeight: 5,        //线宽
  //       strokeStyle: "solid",   //线样式
  // });
  // map.add(polyline);


  },
  methods: {

    initMap() { //初始化地图
      let that = this;
      MapLoader().then(AMap => {
        console.log('地图加载成功');
        that.map = new AMap.Map("mapContainer",{
        resizeEnable: true,
        center: [116.397428, 39.90923],
        minZoom: 3,
        maxZoom: 14,
        zoom: 10,
        zoomControl: false,
        attributionControl: false,
        mapStyle: 'amap://styles/30fb00d596d825ec866dfaee1434d314'
      });
      //that.map.setMapStyle('amap://styles/30fb00d596d825ec866dfaee1434d314');
      //that.amap = AMap;
      // that.layer = new Loca.HeatmapLayer({
      //   map: that.map
      // });
      console.log(typeof AMap);
      console.log(typeof that.map);
      }, e => {
        console.log('地图加载失败', e)
      });
    },

    paintMap() {//在地图上标记

      let that = this;
      var lineArr = [
          [116.368904, 39.913423],
          [116.382122, 39.901176],
          [116.387271, 39.912501],
          [116.398258, 39.904600]
      ];        

      MapLoader().then(AMap => {
        var polyline = new AMap.Polyline({
          path: lineArr, //设置线覆盖物路径
          strokeColor: "#3366FF", //线颜色
          strokeWeight: 5, //线宽
          strokeStyle: "solid", //线样式
        });
        that.map.add(polyline);
        // var layer = new Loca.PointLayer({
        //   map: that.map,
        // });
        
        console.log(typeof (heatmapData));
        that.map.plugin(["AMap.Heatmap"], function () {
            //初始化heatmap对象
            that.heatmap = new AMap.Heatmap(that.map, {
                radius: 25, //给定半径
                opacity: [0, 0.8]
                /*,
                gradient:{
                    0.5: 'blue',//表示某个索引对象的count值所在的百分比小于0.5,则只有一个最外层的蓝色圆
                    0.65: 'rgb(117,211,248)',// heatmapData某个索引的对象的count值所在百分比小于0.65大于等于0.5则有一个最外层的蓝色圈和次外层rgb(117,211,248)颜色的圈
                    0.7: 'rgb(0, 255, 0)',
                    0.9: '#ffea00',
                    1.0: 'red'
                }
                */
            });
            //设置数据集：该数据为北京部分“公园”数据
            that.heatmap.setDataSet({
                data: DataHeap.heatmapData,
                max: 100
            });

            that.heatmap.show();        
        })

      }, e => {
        console.log('地图加载失败', e)
      });
    }
    // paintHeapmap() { //绘制对应经纬度的热力图数据


    // },

  }
};
</script>






<style lang="less" scoped>
.mapContainer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}


</style>