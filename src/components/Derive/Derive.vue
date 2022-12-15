<template>
	<div class="main">
		<div style="display: flex">
			<div style="width: 2px;height: 21px;background: #1D2088;margin-right: 12px"></div>
			<div>{{ titleStr }}</div>
		</div>
		<el-form style="margin-top: 36px" label-width="80px" size="small" class="el-form-item">
			<el-form-item v-for="(item,index) in data" :label="item.label" style="height: 70px;" :style="{ height: infoStr ? '85px' : '63px' }">
				<el-select v-model="formData[item.key]" :placeholder="infoArr[index]" @change="item.onChange ? item.onChange($event) : null" :disabled="item.disabled">
					<el-option
						v-for="item in item.options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				<div style="color: #999;font-size: 12px" v-if="index === 0">{{ infoStr }}</div>
			</el-form-item>
			<el-button type="primary" @click="onDerive" debounce style="height: 32px;display: flex;align-items: center;margin-left: 12px">
				导出
			</el-button>
		</el-form>
	</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
	data() {
		//这里存放数据",
		return {};
	},
	props: {
		titleStr: String,
		infoStr: String,
		infoArr: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array,
			default: function () {
				return [{
					label: '',
					value: '',
					key: '',
					options: [],
					onChange: Function | undefined,
					disabled: Boolean,
				}];
			},
		},
		formData: {
			type: Object,
			default: function () {
				return {
					value: '',
				};
			},
		},
		onDerive: {
			type: Function,
			default: function () {
				return function () {};
			},
		},
	},
	//方法集合",
	methods: {},
};

</script>

<style scoped lang="scss">
.main {
	width: 100%;
	min-height: 120px;
	padding: 70px 24px 24px 70px;
}

.el-form-item--small.el-form-item {
	margin-bottom: 0 !important;
	width: 33% !important;
}

.el-form {
	display: flex;
	flex-wrap: wrap;
}
</style>
