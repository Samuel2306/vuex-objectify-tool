/**
 * Created by feng.shen on 2018/12/29.
 */
// import Vue from 'vue'
import {mapState,mapMutations,mapGetters,mapActions,createNamespacedHelpers} from 'vuex'
import dependenceMap from './dependenceMap'

var util = {
  reservedWords: ['state','mutations','getters','actions'],
  isType: function(obj,type){
    return Object.prototype.toString.call(obj).toLowerCase() == "[object " + type.toLowerCase() + "]"
  },
  isString: function(obj){
    return this.isType(obj,'string')
  },
  isObject: function(obj){
    return this.isType(obj,'object')
  },
  isEmptyObject: function(val){
    var t;
    for(t in val){
      return !1;
    }
    return !0;
  },
}

var StoreMap = {
  map: dependenceMap
}

var createDependence = function(collection, supervisory){
  if(util.isEmptyObject(StoreMap.map)){
    console.warn('请在全局注册依赖管理对象')
    return
  }
  if(util.isString(collection)){
    if(util.reservedWords.indexOf(collection) > -1){
      throw new Error(collection + '属于保留字，不能作为依赖集合名称')
    }else{
      collection = StoreMap.map[collection]
    }
  }
  // 可以直接从JSON对象里面获取现成组合，也可以直接写入一个依赖对象
  // 当options是一个字符串时，可以认为是一个自定义的页面名称
  // options = Object.prototype.toString.call(options).toLowerCase() == "[object string]" ? dependenceMap[options] : options
  var exp = {
    computed: {
      // nameList: []
    },
    methods: {
      // nameList: []
    }
  }
  // keys里面元素对应着模块名，因为很多时候项目都是多模块的，所以要区分模块
  var keys = Object.keys(collection)
  keys.forEach(function(key,index){
    if(util.isString(key) && util.reservedWords.indexOf(key) > -1){
      throw new Error(key + '属于保留字，不能作为模块名称')
    }

    // 顶层模块的名称必须为root
    var isRoot = !!(key == 'root' || key == 'Root')

    // 获取特定模块的state，mutations和getters
    if(!isRoot){
      // console.log(key)
      // console.log(key)
      var helpers = createNamespacedHelpers(key)
    }
    var option = collection[key] // 对于某个模块的依赖对象

    // name就是依赖的类型：state，mutation或者getters
    Object.keys(option).forEach(function (name,i) {
      var arr = option[name]
      var areaObject = (name == 'state' || name == 'getters') ? exp.computed : exp.methods
      var errMsg = (name == 'state' || name == 'getters') ? '计算值存在属性名重复问题，重复属性名为：' : 'methods中存在方法名重复问题，重复方法名为：'
      var content = {}
      arr.forEach(function(elem,j){
        if(util.isString(elem)){
          if(areaObject[elem] != undefined){
            throw new Error(errMsg + elem)
          }

          content[elem] = elem
        }
        // 可以穿入一个对象，因为有时候不同模块之间可能会存在相同的属性名，需要对某个模块里面的属性重命名
        else if(util.isObject(elem)){
          var attr = Object.keys(elem)[0]
          // elem是个空对象
          if(!attr){
            return
          }
          if(areaObject[attr] != undefined){
            throw new Error(errMsg + attr)
          }

          content = Object.assign(content,elem)
        }
      })
      // 获取不同module里面的引用
      if(!isRoot){
        // console.log(helpers)
        areaObject = Object.assign(areaObject,helpers['map' + name.substring(0,1).toUpperCase() + name.substring(1)](content))
      }else{
        // console.log(name)
        // console.log(name.substring(0,1))
        if(name == 'state'){
          areaObject = Object.assign(areaObject,mapState(content))
        }
        if(name == 'mutations'){
          areaObject = Object.assign(areaObject,mapMutations(content))
        }
        if(name == 'getters'){
          areaObject = Object.assign(areaObject,mapGetters(content))
        }
        // areaObject = Object.assign(areaObject,'map' + name.substring(0,1).toUpperCase() + name.substring(1)(content))
      }
    })
  })
  return exp
}


var initStoreMap = function(store){

}
export default {
  StoreMap,
  initStoreMap,
  createDependence
}


