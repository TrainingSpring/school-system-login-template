<template>
	<div class="page-box">
		<div style="text-align: center; line-height: 30px; padding-top: 50px">
			<h2>欢迎使用鸿鹄教育信息化系统</h2>

			<div style="font-size: 18px; margin: 20px 0">今天是 {{ arr[0] }} 年 {{ arr[1] }} 月 {{ arr[2] }} 日 星期{{ week }}</div>
			<div style="color: #fff; background: #1e2088; width: 200px; height: 40px; margin: auto; border-radius: 50px; line-height: 40px">
				祝您早安 , 午安 , 晚安
			</div>
			<div class="img"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			arr: [],
			str: '',
			str1: '',
			week: ''
		}
	},
	created() {},
	mounted() {
		this.a()
	},
	methods: {
		a() {
			let date = new Date()
			let week = ['日', '一', '二', '三', '四', '五', '六']
			this.arr = date.toLocaleDateString().split('/')
			this.week = week[date.getDay()]
			this.str = date.toLocaleTimeString()
		}
	}
}
</script>

<style lang="scss">
.page-box {
	width: 100%;

	min-height: 100%;
	.img {
		background-image: url('../../assets/img/home.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: 400px;
		height: 400px;
	}
}
</style>
