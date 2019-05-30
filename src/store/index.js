import Vue from 'vue'
import Vuex from 'vuex'
import OrderListState from './order_list/state'
import OrderDetailState from './order_detail/state'
// import dependenceMap from '../vuex_objectify_tool/dependenceMap'
import StoreObjectifyTool from '../vuex_objectify_tool'
import supervisory from '../supervisory'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules:{
    OrderListState,
    OrderDetailState
  },
  state: {
    code: '1',
    cardStatusMap: {
      '0': '未处理',
      '1': '处理中',
      '2': '完成'
    },
    batteryTypeList: [
      {
        deviceTypeId: 8,
        deviceTypeName: "用户车辆",
        id: 1
      },
      {
        deviceTypeId: 0,
        deviceTypeName: "换电站",
        id: 2
      },
      {
        deviceTypeId: 1,
        deviceTypeName: "储能站",
        id: 3
      },
      {
        deviceTypeId: 2,
        deviceTypeName: "移动充电车",
        id: 4
      }
    ]
  },
  mutations: {
    setCode(state,code){
      state.code = code
    }
  },
  getters: {
    list: (state,getters,rootState,store) => {
      // console.log(state)
      var obj = {}
      for(var prop in state.cardStatusMap){
        if(prop != '2'){
          obj[prop] = state.cardStatusMap[prop]
        }
      }
      return obj
    }
  },
  plugins: [StoreObjectifyTool.initStoreMap,supervisory]
})
// console.log(store)
export default store
