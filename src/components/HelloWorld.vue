<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ code }}</h1>
    <h1>{{ add }}</h1>
    <h1>{{ id }}</h1>
    <h1>{{ num1 }}</h1>
    <h1>{{ cardStatusMap }}</h1>
    <h1>{{ list }}</h1>
    <h1>{{ list1 }}</h1>
    <button @click="setNum">按钮</button>
  </div>
</template>

<script>
import StoreObjectifyTool from '../vuex_objectify_tool'
export default {
  name: 'HelloWorld',
  mixins: [StoreObjectifyTool.createDependence('page1')],
  computed: {
    add(){
      return '1'
    }
  },
  methods: {
    setNum(){
      this.addNum()
      this.setId1("aaa")
      this.setCode("sss")
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
