Function.prototype.before = function(beforefn){
  var  _self = this  // 保存原函数的引用
  // console.log(_self)
  // 返回包含了原函数和新函数的"代理"函数
  // 里面的this就是调用"代理"函数对象
  return function(){
    // 执行新函数，且保证 this 不被劫持，新函数接受的参数也会被原封不动地传入原函数，新函数在原函数之前执行
    beforefn.apply(this)
    // 执行原函数并返回原函数的执行结果，并且保证 this 不被劫持
    return  _self.apply(this,arguments)
  }
}

var isEmptyObject = function(val){
  var t;
  for(t in val){
    return !1;
  }
  return !0;
}

function registerMutation (store, type, handler, local) {
  store._mutations[type] = [
    function wrappedMutationHandler (payload) {
      handler.call(store, local.state, payload)
    }
  ]
  const entry = store._mutations[type] || (store._mutations[type] = [])
}

var forEachExpandMutations = function(modules,store,path){
  // var modules = store._modules
  var path = path || []
  // var moduleName;
  var mutations;
  var index = 0;
  for(var moduleName in modules){
    path = path.slice(0)
    if(index > 0){
      path.pop()
    }
    path.push(moduleName)
    index += 1;

    mutations = modules[moduleName] && modules[moduleName]._rawModule ? modules[moduleName]._rawModule.mutations : undefined
    if(!mutations || isEmptyObject(mutations)){
      return
    }
    for(var fName in mutations){
      var pathName = path.slice(0).join('/') + '模块的'
      var func = (function(pathName, fName){
        return function(){
          console.log(pathName + '【' + fName + '】mutation被调用')
        }
      })(pathName, fName)
      mutations[fName] = mutations[fName].before(func)
    }
    if(modules[moduleName]._children && !isEmptyObject(modules[moduleName]._children)){
      forEachExpandMutations(modules[moduleName]._children,store,path)
    }

    modules[moduleName].forEachMutation((mutation, key) => {
      const namespacedType = moduleName.toLowerCase() == 'root' ? key : moduleName + '/' + key
      registerMutation(store, namespacedType, mutation, modules[moduleName])
    })
  }
}


var initSupervisory = function(store){
  var _modules = store._modules
  forEachExpandMutations(_modules,store)
}
export default initSupervisory
