<template>
	<div class="t_dialog">
		<t-dialog ref="dialog" v-bind="$attrs" v-on="$listeners">
			<template slot="title">
				<div class="t_title_top">{{ title }}</div>
				<div class="t_title_bottom" v-if="title != null && title !== ''"></div>
			</template>
			<div class="t_title_body">
				<slot> </slot>
			</div>
			<div class="t_title_footer" slot="footer">
				<slot name="footer"></slot>
			</div>
		</t-dialog>
	</div>
</template>

<script>
import { Dialog } from 'element-ui'

export default {
	props: {
		title: String
	},
  watch:{
    "$attrs.visible"(n){
      if (n){
        if (parseInt(this.$refs.dialog.$el.style.zIndex) < 1000){
          this.$refs.dialog.$el.style.zIndex = 2000;
        }
      }
    }
  },
	components: {
		't-dialog': Dialog
	},
	methods: {
		close() {
			this.$emit('update:visible', false)
		}
	}
}
</script>

<style lang="scss">
.t_dialog {
	.t_title_top {
		font-size: 16px;
		font-weight: 500;
		border-left: 4px solid #1d2088;
		padding-left: 10px;
		margin-left: 24px;
		margin-top: 14px;
	}
	.t_title_bottom {
		margin-top: 10px;
		margin-left: 24px;
		border-bottom: 1px solid #eaeaea;
	}
	.t_title_body {
		padding: 0px 24px !important;
	}
  .t_title_footer{
    margin-top: 24px !important;
  }
}
</style>
