<template>
	<div class="t-list">
		<div class="t-top" v-if="searchConfig || hasAdd || hasBack" >
			<!--			<el-button-group v-if="hasBack || hasAdd">-->
      <div style="display: inline-block;margin-bottom: 20px;" v-if="hasAdd || hasBack">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-arrow-left"
            v-if="hasBack"
            @click="
					$emit('onBack')
					$router.back()
				"
        >返回</el-button
        >
        <el-button type="primary" icon="el-icon-plus" v-if="hasAdd" @click="$emit('onAdd')" size="small">新增</el-button>
      </div>

			<!--			</el-button-group>-->
      <t-search-block ref="searchBlock"
                      v-if="searchConfig"
                      :search-config="searchConfig"
                      @onSearch="res=>$emit('onSearch',res)"
                      @onReset="$emit('onReset')"
                      @onChange="val=>$emit('onChange',val)">

      </t-search-block>
		</div>
		<slot name="title"></slot>
<!--		<div v-if="(tableData && tableData.length > 0) || loading">-->
		<div >
			<div class="t-table" style="margin-right: 40px">
				<el-table
					v-loading="loading"
					:stripe="false"
					:data="tableData"
					style="width: 100%"
					size="small"
					:cell-style="cellStyle"
          v-on="events"
          v-bind="property"
				>
          <template slot="empty">
            <t-result type="empty"></t-result>
          </template>
          <template
              v-for="item in tableConfig">
            <el-table-column
                v-if="!['index','expand','selection'].includes(item.type)"
                v-bind="item.property||{}"
                :width="item.width"
                :min-width="item.minWidth"
                :type="item.type"
                :prop="item.prop"
                :label="item.label"
                :show-overflow-tooltip="item.showOverflowTooltip==null?true:item.showOverflowTooltip">
              <template slot-scope="scope">
                <div v-if="item.type === 'index'"
                     :style="{
							        'text-align': item.textAlign || 'center'
                   }"
                     style="width: 100%">
                  <span>{{ scope.$index + 1 }}</span>
                </div>
                <div v-else-if="!!item.handle">
                  <a
                      class="t-handle"
                      href="javascript:;"
                      v-for="(handle, index) in item.render(scope.row)"
                      :key="'_' + index"
                      @click="onHandle(scope.row, handle, index)"
                  >{{ handle }}</a
                  >
                </div>
                <div v-else :class="item.showOverflowTooltip || item.showOverflowTooltip == null?'text-one':''">
                  <span v-if="!item.render">{{ scope.row[item.prop] }} </span>
                  <span v-else v-html="item.render(scope.row)"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column  v-bind="item.property||{}"
                              :width="item.width"
                              :min-width="item.minWidth"
                              :type="item.type"
                              :prop="item.prop"
                              :label="item.label"
                              :show-overflow-tooltip="item.showOverflowTooltip==null?true:item.showOverflowTooltip"
                              v-else>

            </el-table-column>

          </template>
				</el-table>
			</div>
			<div class="t-pagination">
				<el-pagination
					v-if="total != null"
					background
					:current-page="currentPage"
					@current-change="changeCurrentPage"
					:page-size="pageSize"
					layout="total, prev, pager, next,jumper"
					:total="total"
				>
				</el-pagination>
			</div>
		</div>
<!--		<t-result v-else type="empty"></t-result>-->
	</div>
</template>

<script>
import Button from '../Button/Button'
import TSearchBlock from "../SearchBlock/SearchBlock";

export default {
	name: 'table-template',
	props: {
		// 是否有返回按钮
		hasBack: Boolean,
		// 是否有新增按钮
		hasAdd: Boolean,
		// 搜索的配置
		// tag : 标签类型: input , select
		// type : input标签的type(input标签独有)
		// prop : 绑定的数据的参数名  , 在点击搜索按键时回调里会用到
		// placeholder : 原生的占位符
		// options: select的option 配置  数组类型 , 其中对应有value,和label  (不一定非得这两个值) 在下面配置
		// label : select label的映射键  默认 'label'
		// value : select value的映射键  默认 'value'
		searchConfig: Array,
    // 表格事件
    // 参考 https://element.eleme.cn/#/zh-CN/component/table#table-events
    events:Object,
    // 表格属性
    // 参考 https://element.eleme.cn/#/zh-CN/component/table#table-attributes
    property:Object,
		// 表格配置
		// prop 字段名
		// label 列展示名
		// width 列宽
		// type 列的类型   可选值: selection/axios/expand
		// handle 是否为操作列
		// render {return : Array[string]} 渲染操作 , 返回数组 没有不写即可
		tableConfig: Array,
		// 表格数据
		tableData: Array,
		// 分页配置:
		// total :  总数据数量
		total: Number,
		// currentPage :  当前页码
		currentPage: Number,
		// 加载中
		loading: Boolean,
		// 每页数据量
		pageSize: {
			type: Number,
			default() {
				return 20
			}
		},

    //不检查搜索框是否必填, 默认检查
    isCheckInputBox: {
		  type: Boolean,
      default() {
        return true;
      }
    }
	},
	data() {
		return {
			search: {}
		}
	},
  watch:{
	  search:{
	    deep: true,
      handler(val){
        this.$emit('onChange', val)
      }
    }
  },
	components: {
    TSearchBlock,
		't-button': Button
	},
  methods: {

		// 分页被更改
		changeCurrentPage(e) {
			this.$emit('onChangePage', e)
		},
		/**
		 * @description 表格的操作
		 * @param row  当前行的数据
		 * @param handle 操作按钮的文字
		 * @param index 操作按钮的下标
		 */
		onHandle(row, handle, index) {
			this.$emit('onHandle', row, handle, index)
		},
    cellStyle(row){
      // type:  axios , selection , expand
      if (row.column.type === 'selection'){
        return {
          paddingLeft:'9px'
        }
      }
      else return { textIndent:'12px', fontSize: '14px' }
    }
	}
}
</script>

<style scoped lang="scss">
.t-list {
	padding: 24px 0 0 24px;
	.t-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 40px;
	}
	.t-handle {
		margin-right: 15px;
		text-indent: 0;
	}
	.t-handle:last-child {
		margin-right: 0;
	}
	.t-pagination {
		margin-top: 40px;
	}
	::v-deep .el-table th.el-table__cell {
		text-align: left;
		background-color: rgba(232, 237, 255, 0.39);
		font-size: 14px;
		padding-left: 12px;
		font-weight: bold;
		color: #333333;
	}
}
</style>
