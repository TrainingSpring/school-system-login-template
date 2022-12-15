<template>
  <!-- 历史记录弹窗 -->
  <el-dialog :visible.sync='historyDialog' width='30%' :before-close="() => $emit('close')">
    <div v-if="historyData.length">
      <div v-for="item in historyData" class="history-box flex flex-between">
        <div class="flex flex-between" style="width: 10px">
          <div class="step-box" style="padding-top: 16px">
            <div class="cir"></div>
            <span class="cir-line"></span>
          </div>
        </div>
        <div style="width: calc(100% - 50px);padding: 0 0 30px">
          <p>{{ item.change }}</p>
        </div>
      </div>
    </div>
    <t-result v-if="!historyData.length" :type="'empty'"></t-result>
  </el-dialog>
</template>

<script>
export default {
  name: "HistoryToDialog",
  props: {
    historyDialog: Boolean, // 弹窗显示隐藏
    historyData: Array // 显示数据
  }
}
</script>

<style scoped lang="scss">
.history-box {
  .step-box {
    position: relative;
  }

  .cir {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 15px;
    height: 15px;
    background-color: #1D2088;
    border-radius: 50%;
    z-index: 1;
  }

  .cir-line {
    position: absolute;
    top: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background-color: #ccc;
  }

  .div1 > div {
    word-break: keep-all;
    white-space: nowrap;
    padding-right: 40px;
    height: 66px;
    line-height: 66px;
    padding-left: 20px;
    color: #333;
  }

  &:last-child {
    .cir-line {
      display: none;
    }
  }
}
</style>