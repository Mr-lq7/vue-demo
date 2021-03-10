import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css' //引入阿里图标库
import L from 'leaflet/dist/leaflet.js' 
import 'leaflet/dist/leaflet.css'

// import * as L from 'leaflet'
import axios from 'axios'
// import TreeTable from 'vue-table-with-tree-grid'
// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import { ElDatePicker } from 'element-ui/types/date-picker'

// import AMap from 'vue-amap'
// Vue.use(AMap);

// AMap.initAMapApiLoader({
//     key: '13ed970351e00c018ba3d252ed5d8812',
//     //插件
//     plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.4'
//     });


    
Vue.use(L);

// Vue.use(ElDatePicker)
//axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
//axios.defaults.baseURL = 'http://localhost:8443/api'
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'

axios.defaults.baseURL = 'http://localhost:8888/'
// 请求头拦截
axios.interceptors.request.use(config => {
    NProgress.start()
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

axios.interceptors.response.use(config => {
    NProgress.done()
    return config
})
Vue.prototype.$http = axios


// Vue.component('tree-table', TreeTable)
// Vue.use(VueQuillEditor)

// Vue.filter('dateFormat', (originVal) => {
//     const dt = new Date(originVal)
//     const y = dt.getFullYear()
//     const m = (dt.getMonth() + 1 + '').padStart(2, '0')
//     const d = (dt.getDate() + 1 + '').padStart(2, '0')
//     const hh = (dt.getHours() + 1 + '').padStart(2, '0')
//     const mm = (dt.getMinutes() + 1 + '').padStart(2, '0')
//     const ss = (dt.getSeconds() + 1 + '').padStart(2, '0')
//     return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
// })

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')