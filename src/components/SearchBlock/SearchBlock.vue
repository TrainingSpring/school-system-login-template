<template>
<div class='t-search-block'>

  <!--			</el-button-group>-->
  <div v-for='(item,index) in searchConfig' :style="{marginBottom:'20px'}" class='t-input'>
    <el-input
        v-if="item.tag === 'input' || !item.tag"
        v-model='search[item.prop]'
        :placeholder='item.placeholder'
        :type="item.type || 'text'"
        size='small'
        v-bind='item.config'
        @enter='onSearch(false)'
    ></el-input>
    <el-select
        v-if="item.tag === 'select'"
        :disabled='item.disabled'
        :filterable='item.filterable||false'
        :multiple='item.multiple'
        :placeholder='item.placeholder'
        :popper-append-to-body='false'
        :remote='item.remote'
        :reserve-keyword='item.reserveKeyword'
        :value='search[item.prop]'
        size='small'
        @change='item.change ? item.change($event,search) : null'
        @enter='onSearch(false)'
        @input='value=>{search[item.prop] = value;$forceUpdate();}'
    >
      <el-option
          v-for='option in item.options'
          :key="option[item.value || 'value']"
          :label="option[item.label || 'label']"
          :value="option[item.value || 'value']"
          v-bind='item.config'
      ></el-option>
    </el-select>
    <el-cascader
        v-if="item.tag === 'cascader'"
        v-model='search[item.prop]'
        :options='item.options'
        :popper-append-to-body='false'
        size='small'
        v-bind='item.config'
        @change='item.change ? item.change($event) : null'
        @enter='onSearch(false)'
    ></el-cascader>
    <el-date-picker
        v-if="item.tag === 'datePicker'"
        v-model='search[item.prop]'
        v-bind='item.property'
        @enter='onSearch(false)'
    >
    </el-date-picker>
    <el-autocomplete
        v-if="item.tag === 'autocomplete'"
        v-model='search[item.prop]'
        :disabled='item.disabled'
        :fetch-suggestions='item.querySearch'
        :placeholder='item.placeholder'
        :trigger-on-focus='false'
        :value-key='item.valueKey'
        size='small'
        @enter='onSearch(false)'
        @select='item.handleSelect'
    ></el-autocomplete>
    <el-select
        v-if="item.tag === 'searchSelect'"
        v-model='search[item.prop]'
        :loading='item.loading'
        :multiple='item.multiple'
        :placeholder='item.placeholder'
        :remote-method='item.remoteMethod'
        filterable
        remote
        reserve-keyword
        @enter='onSearch(false)'>
      <el-option
          v-for='option in item.options'
          :key="option[item.value || 'value']"
          :label="option[item.label || 'label']"
          :value="option[item.value || 'value']">
      </el-option>
    </el-select>
  </div>
  <div :style='searchButtonsStyle' class='buttons' style='display: inline-block;margin-bottom: 20px;'>
    <el-button debounce size='small' type='primary' @click.prevent='onSearch(false)'>搜索</el-button>
    <el-button
        debounce
        size='small'
        style='margin-left: 16px'
        @click.prevent='reset'
    >重置</el-button>
    <slot name='search'></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "TSearchBlock",
  props: {
    // 搜索按钮的样式
    searchButtonsStyle: Object | String,
    // 搜索的配置
    // tag : 标签类型: input , select , cascader, autocomplete,searchSelect
    // type : input标签的type(input标签独有)
    // prop : 绑定的数据的参数名  , 在点击搜索按键时回调里会用到
    // placeholder : 原生的占位符
    // options: select的option 配置  数组类型 , 其中对应有value,和label  (不一定非得这两个值) 在下面配置
    // label : select label的映射键  默认 'label'
    // value : select value的映射键  默认 'value'
    searchConfig: Array,
  },
  data() {
    return {
      search: {}
    }
  },
  mounted() {
    this.setDefaultSearchValue();
  },
  watch: {
    search: {
      deep: true,
      handler(val) {
        this.$emit('onChange', val)
      }
    }
  },
  methods: {
    // 搜索
    onSearch(reset) {
      if (!reset && this.isCheckInputBox) {
        if (this.search == null) return this.$message.warning('搜索内容不能为空!')
        let flag = false
        for (let k in this.search) {
          let val = this.search[k]
          if (!this.$tools.checkInput('empty', val)) {
            flag = true
            break
          }
        }
        if (!flag) return this.$message.warning('搜索内容不能为空!')
      }
      this.$emit('onSearch', this.search)
    },
    /**
     * @description 重置
     */
    reset() {
      this.setDefaultSearchValue([], true);
      this.onSearch(true)
      this.$emit('onReset')
    },
    /**
     * @desc 设置搜索默认值
     * @param {Array} keys 需要重置默认值的字段集合
     * @param {Boolean} reset 是否需要重置search数据
     */
    setDefaultSearchValue(keys = [], reset = false) {
      let config = this.searchConfig;
      let search = this.search;
      if (!config) return;
      if (reset)
        search = this.search = {};
      config.forEach(item => {
        let key = item.prop;
        let def = item.default;
        if (keys.length > 0) {
          if (keys.includes(key) && def != null)
            search[key] = def;
        } else if (def != null)
          search[key] = def;
      })
      this.$set(this, "search", search);
      // this.search = search;
    },
  }
}
</script>

<style lang='scss' scoped>

.t-search-block {
  .t-input {
    display: inline-block;
  }

  .el-input,
  .el-select,
  .el-cascader,
  .el-autocomplete {
    width: 10.55502183406114vw;
    //width: 14.98470948012232vw;
    margin-right: 24px !important;
  }
}
</style>
