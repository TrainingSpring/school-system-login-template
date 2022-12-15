<template>
  <div class="t-date-picker">
    <div class="el-input t-date-picker-input" ref="datePicker" v-show="!disabled" @click.stop="showDatePicker">
      <i class="el-icon-date"></i>
      <i class="el-icon-circle-close" @click.stop="clearDate"></i>
<!--      v-if="!currentDate || !currentDate.length"-->
      <span class="t-placeholder" >
        {{ placeholder }}
      </span>
<!--      <span class="t-date-show" v-else>
        <el-tag type="info" size="mini" effect="plain" @close="removeTag(axios)" v-for="(item,axios) in formatStr" style="margin-right: 5px;">{{ item }}</el-tag>
        {{(extra||"")}}
      </span>-->
    </div>
    <el-input disabled v-show="disabled" :placeholder="placeholder"></el-input>
    <div v-show="visible" @click.stop :style="{position:'absolute',top:position.top+'px',left:position.left+'px',zIndex:10}">
      <div class="el-picker-panel el-date-picker el-popper t-picker-box">
        <div class="el-picker-panel__body-wrapper">
          <div class="el-date-picker__header">
            <button type="button" aria-label="前一年"
                    @click="nextYear(-1)"
                    class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left"></button>
            <button type="button" aria-label="上个月"
                    v-show="showView !== 1 && showView !== 2"
                    @click="nextMonth(-1)"
                    class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left">
            </button>
            <span role="button" class="el-date-picker__header-label" @click="showView = 2">{{formatDate.yarn}} 年</span>
            <span role="button"
                  class="el-date-picker__header-label" @click="showView = 1"  v-show="showView !== 1 && showView !== 2">{{formatDate.month}} 月</span>
            <button type="button" aria-label="后一年"
                    @click="nextYear(1)"
                    class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right"></button>
            <button type="button" aria-label="下个月"
                    v-show="showView !== 1 && showView !== 2"
                    @click="nextMonth(1)"
                    class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right"></button>
          </div>
          <div class="el-picker-panel__content t-picker">
            <day :date="date"  @pick="datePick($event,0)" selection-mode="dates" :value="currentDate" :disabledDate="disabledDate" v-show="showView === 0"></day>
            <month :date="date" @pick="datePick($event,1)" :value="currentMonth" v-show="showView === 1"></month>
            <year :date="date" @pick="datePick($event,2)" :value="currentYear" v-show="showView === 2"></year>
          </div>
        </div>
        <slot name="right"></slot>
      </div>
    </div>

  </div>
</template>

<script>
import year from "element-ui/packages/date-picker/src/basic/year-table"
import month from "element-ui/packages/date-picker/src/basic/month-table"
import day from "element-ui/packages/date-picker/src/basic/date-table"
export default {
  name: "t-date-picker",
  computed:{
    formatDate(){
      let year = this.date.getFullYear();
      let m = year % 10;
      let str = year;
      if (this.showView === 2){
        str = (year - m) + " - " + (year + 9 -m);
      }
      return {
        yarn:str,
        month:this.date.getMonth()+1
      }
    },

  },
  data(){
    return {
      today:new Date(),
      currentDate:[],
      currentYear:null,
      currentMonth:null,
      date:new Date(),
      visible:false,
      showView:0,   // 显示视图 , 2年  1 月  0日
      position:{
        let:0,
        top:0
      },
      formatStr:""
    }
  },
  props: {
    placeholder: {
      type: String,
      default: () => "请选择时间"
    },
    disabled:Boolean,
    value:Array,
    format:{
      type:String,
      default:()=>"yyyy-MM-dd"
    },
    extra:String,  // 额外的数据
  },
  components: {
    year, month, day
  },
  mounted() {
    let datePick = this.$refs.datePicker;
    let left = datePick.offsetLeft;
    let top = datePick.clientHeight;
    this.position = {
      left,
      top
    }

  },
  methods:{
    // 禁用日期
    disabledDate(cell){
      let date = new Date();
      let str = date.Format("yyyy-MM-dd")+" 00:00:00";
      let now = (new Date(str)).getTime();
      let curDate = cell.getTime();
      return curDate < now;
    },
    showDatePicker(e){
      this.visible = true;
      // e.stopPropagation();
      document.onclick =  (e)=> {
        this.visible = false;
        document.onclick = null;
      }
    },
    datePick(e,type){
      let date = this.date;
      switch (type) {
        case 0:
          this.currentDate = e;
          // this.date = e;
          this.formatStr = e.map(item=>(item.Format(this.format)))
          this.$emit("input",e)
          this.$emit("onChange",{
            date:e,
            format:this.formatStr
          });
          break;
        case 1:
          this.date = new Date(date.setMonth(e))
          this.currentMonth = this.date;
          this.showView = 0;
          break;
        case 2:
          this.date = new Date(date.setFullYear(e))
          this.currentYear = this.date;
          this.showView = 1;
          break;
      }
    },
    // 下一年
    nextYear(num = 1){
      if (this.showView === 2)num = num * 10;
      let year = this.date.getFullYear();
      let date = this.date.setFullYear(year + num)
      this.date = new Date(date);
    },
    // 下一月
    nextMonth(num = 1){
      let month = this.date.getMonth();
      let date = this.date.setMonth(month + num);
      this.date = new Date(date);
    },
    // 清除日期数据
    clearDate(){
      this.currentDate = null;
      this.currentYear = null;
      this.currentMonth = null;
      this.date = new Date();
      this.formatStr = null;
      this.$emit("input",null);
      this.$emit("onClear");
    },
    // 删除标签
    removeTag(index){
      let val = this.value;
      this.$emit("input",val.splice(index,1));
      this.formatStr = val.map(item=>(item.Format(this.format)))
      this.$emit("onChange",{
        date:val,
        format:this.formatStr
      })
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss" scoped>
.t-date-picker {
  .t-date-picker-input{
    border: 1px solid #ccc;
    padding: 0 15px;
    border-radius: 4px;
    min-height: 38px;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .el-input {
    .t-placeholder {
      margin-left: 10px;
      color: #ccc;
    }
    .t-date-show{
      color:#666;
      margin-left: 10px;
      display: block !important;
    }

    .el-icon-date {
      color: #ccc;
      margin-left: -10px;
      margin-right: 6px;
      position: absolute;
      top:0;
      height: 40px;
      line-height: 40px;
    }

  }
  .el-icon-circle-close{
    opacity: 0;
    position: absolute;
    right: 5px;
    top:0;
    height: 40px;
    line-height: 40px;
    color:#ccc;
    font-size: 14px;
    cursor: pointer;
  }
  .el-input:hover .el-icon-circle-close{
    opacity: 1;
  }
  // picker
  .el-date-picker{
    width: 490px !important;
    display: flex !important;
    .t-picker-box{
      //width: 100px;
    }
    .cell{

    }
  }
}
</style>
