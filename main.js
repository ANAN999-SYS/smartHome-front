import App from './App'
import nv from "@/uni_modules/pyh-nv/components/pyh-nv/pyh-nv.vue";

//引入websocket文件
import wsRequest from '@/websocket/websocket.js'
//开启websocket
let websocket = new wsRequest(3000)
//挂载到全局
Vue.prototype.$socket = websocket

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component("pyh-nv",nv)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
app.component('pyh-nv',nv)
// #endif