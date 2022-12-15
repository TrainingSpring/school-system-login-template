<template>
  <div class="t-textarea">
      <el-input type="textarea" :value="value" @input="onInput" style="width: 100%;" :rows="rows" :resize="resize"
                :maxlength="maxlength"
                :placeholder="placeholder" @change="$emit('change',$event)"></el-input>
      <span v-if="showWordLimit && maxlength && maxlength >= valueLen" class="t-word-count">{{current}}/{{maxlength}}</span>
      <span v-if="showWordLimit && maxlength && maxlength < valueLen" class="t-word-count t-word-count-extra">{{current}}/{{maxlength}}</span>
  </div>
</template>

<script>
export default {
  name: "t-textarea",
  props:{
    value:String,
    showWordLimit:Boolean,
    // resize 值:none, both, horizontal, vertical
    resize:{
      type:String,
      default(){
        return "none"
      }
    },
    maxlength:Number|String,
    overflow:Boolean,
    // 不用于计数的正则 如: /[\s\n]/g
    filter:RegExp,
    rows:Number|String,
    placeholder:{
      type:String,
      default(){
        return "请输入"
      }
    },
  },
  computed:{
    current(){
      let temp = this.value || "";
      if (this.filter){
        temp = temp.replace(this.filter,"");
      }
      return temp.length;
    },
    valueLen(){
      return this.value?this.value.length:0;
    }
  },
  data(){
    return{

    }
  },
  methods:{
    onInput(e){
      this.$emit("input",e);
    }
  }
}
</script>

<style lang="scss" scoped>
  .t-textarea{
    position: relative;
    .t-word-count{
      line-height: 30px;
      position: absolute;
      bottom: 1px;
      right: 10px;
      color: #999;
      font-size: 12px;
      background-color: white;
    }
    .t-word-count-extra{
      color: red;
    }
  }
</style>
