<template>
  <div class="el-input big-data-select-item" v-if="!disabled" ref="selectItem" @click.stop="onClick">
    <span class="big-data-select-item-placeholder" v-if="texts.length===0">{{placeholder}}</span>
    <span class="big-data-select-item-text big-data-select-item-only" v-else-if="texts.length === 1">
      <span>
        {{showText}}
      </span>

    </span>
    <span class="big-data-select-item-text big-data-select-item-only" v-else v-for="(item , index) in texts" :key="'big_data-item-'+index">

      <span v-if="rootSelect.config.showAllLevels === false">
        {{item.pathLabels.join("/")}}
      </span>
      <span v-else>
        {{item.pathLabels[item.pathLabels.length-1]}}
      </span>
    </span>
    <i class="el-icon-arrow-down"></i>
  </div>
  <div v-else>
    <el-input disabled :placeholder="placeholder" :value="showText"></el-input>
  </div>
</template>

<script>
export default {
  name: "BigDataSelectItem",
  inject:['rootSelect'],
  props:{
    value:[Object,String],
    placeholder:String,
    disabled:Boolean
  },
  computed:{
    showText(){
      let texts = this.texts;
      if (this.rootSelect.config.showAllLevels !== false){
        return texts[0]?texts[0].pathLabels.join("/"):""
      }else{
        return texts[0]?texts[0].pathLabels[texts[0].pathLabels.length-1]:"";
      }
    }
  },
  watch:{
    value(){
      this.getText();
    }
  },
  data(){
    return {
      isShow:false,
      values:null,
      texts:[]
    }
  },
  mounted() {
    this.getText();
  },
  methods:{
    getText (){
      setTimeout(()=>{
        if (this.value){
          let panel = this.rootSelect.$refs["cascader-panel"];
          this.texts = [panel.getNodeByValue(this.value)]
        }else {
          this.texts = [];
        }
      },20)
    },
    onClick(){
      let root = this.rootSelect;
      root.show = root.currentChildren !== this;
      root.model = this.value;
      if (root.show)
        root.currentChildren = this
      else
        return root.currentChildren = null;
      // 父级元素
      let parent = root.$refs.SelectBox;
      // window 的高度
      let win = window.innerHeight;
      // 当前元素
      let cur = this.$refs.selectItem;
      let position = cur.getBoundingClientRect();
      // 父级style parent style
      let ps = parent.style;
      // 距离底部高度
      let bottom = win - position.top;
      ps.left = position.left+'px';
      if (bottom < 220){
        ps.top = position.top-201+'px';
      }else{
        ps.top = position.top+40+'px';
      }

      this.$emit("click",{values:this.value,labels:this.texts});
    },
    onChange(e){
       this.$emit("change",e)
       this.$emit("input",e);
    }

  }
}
</script>

<style scoped lang="scss">
.big-data-select-item{
  border: 1px solid #ccc;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
  background-color: white;
  text-align: right;
  .big-data-select-item-text,.big-data-select-item-placeholder{
    text-overflow: ellipsis;
    white-space:nowrap;
    //height: 40px;
    display: inline-block;
    margin:0 10px;
    width: calc(100% - 50px);
    text-align: left;
  }
  .big-data-select-item-placeholder{
    color: #cccccc;
  }
  .el-icon-arrow-down{
    margin-right: 10px;
    color: #ccc;
  }
}
</style>
