<template>
  <div class="t-big-data-select">
    <slot></slot>
    <div ref="SelectBox" class="t-big-data-select-box" @click.stop style="position: fixed;transition: 200ms all inherit;overflow: hidden;" :style="{maxHeight:show?'201px':0}">
      <el-cascader-panel :show-all-levels="false"
                         :props="{
                            ...config,
                            value:config.value||'value',
                            label:config.label||'label',
                            children:config.children || 'children',
                         }"
                         ref="cascader-panel" v-model="model" v-if="type==='cascader'" :options="options" @change="changeCascader" style="background-color: white;"></el-cascader-panel>
      <el-select v-else-if="type==='select'" v-model="model">
      <el-option v-for="(item,index) in options" :label="item[config.label||'value']" :value="item[config.value||'value']" :key="'key+'+index" />
      </el-select>
    </div>

  </div>
</template>

<script>
export default {
  provide(){
    return{
      rootSelect:this
    }
  },
  props:{
    options:[Object,Array],
    config:Object,
    type:{
      type: String,
      default(){
        return "cascader";
      }
    }
  },
  data(){
    return {
      model:null,
      currentChildren:null,
      show:false
    }
  },
  watch:{

  },
  mounted() {
    document.addEventListener("click",()=> {
      this.show = false;
      this.currentChildren = null;
    })
  },
  methods:{
    /**
     * @description 更改级联选择
     * @param e
     */
    changeCascader(e){
      let panel = this.$refs["cascader-panel"]
      this.currentChildren.texts =  panel.getCheckedNodes(true);
      this.currentChildren.onChange(e);
      this.show = false;
      this.currentChildren = null;
    }
  },
  name: "BigDataSelect"
}
</script>

<style scoped>
.t-big-data-select{
  position: relative;
}
</style>
