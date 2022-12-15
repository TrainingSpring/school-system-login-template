<template>
  <div class="t-watermark-box">
    <div class="t-watermark" v-show="config.power"
         :style="[!config.fullscreen?{
         left:offset[0] + 'px',
         top: offset[1] + 'px',
    }:null,{position:fixed}]">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: "t-watermark",
  props:{
    position:String,
    config:{
      type:Object,
      default:()=>({
        text:"",
        color:"#ccc",
        opacity:.3,
        power:true,
        fullscreen:false,
        size:18,
        between:[100,200]
      })
    },
    // 水印偏移，当水印全屏为false时生效 [x,y]
    offset:{
      type:Array,
      default: ()=>[270,170]
    },
    // 旋转角度
    angle:{
      type:Number,
      default:15
    }
  },
  computed:{
    fixed(){
      return this.config.fullscreen?"fixed":!this.position?"fixed":this.position;
    }
  },
  mounted() {
    this.renderCanvas();
    this.$parent.$el.style.position = "relative"
  },
  watch:{
    config(o,n){
      this.renderCanvas();
    },
    offset(o,n){
      this.renderCanvas();
    },
    angle(o,n){
      this.renderCanvas();
    },
  },
  data() {
    return {
      ctx:null
    }
  },
  methods:{
    renderCanvas(){
      let canvas = this.$refs.canvas;
      let ctx = this.ctx;
      if (!canvas)return
      else if(!this.ctx)ctx = this.ctx = canvas.getContext("2d");
      if (!ctx)return ;

      let {size,color,between} = this.config;
      let angle = this.angle;
      const winWidth = 2*window.innerWidth,
          winHeight = 2*window.innerHeight;
      ctx.clearRect(0,0,canvas.width,canvas.height)
      let watermarkText = this.config.text;
      canvas.width = winWidth;
      canvas.height = winHeight;
      // 角度转弧度
      let radian = Math.PI / 180 * angle;
      // 文字外围矩形宽度
      let i = size;
      // 文字外围矩形长度
      let k = ((watermarkText||"").match(/[\u4e00-\u9fa5]+/g) || []).join("").length  * i
          + ((watermarkText||"").match(/[\-\d\w]+/g) || []).join().length * i/2
          + ((watermarkText||"").match(/\s+/g) || []).join().length * i/4;
      /**
       * @description 计算初始位置 根据图形测算
       * */
      const countXY = ()=>{
        let a = Math.cos(radian) * k , b = Math.sin(radian) * i, h = Math.sin(radian) * k, g = Math.cos(radian) * i;
        let AC = a + b , AG = h + g;
        return {
          width:AC,
          height:AG,
          a,b,h,g
        }
      }
      let initArea = countXY();
      ctx.rotate(-radian)
      /**水印添加*/
      const createWatermark = (x,y)=>{
        ctx.beginPath();
        ctx.fillStyle = this.$tools.colorHEXToDEC(color,this.config.opacity);
        ctx.font=(size) + 'px Arial';
        ctx.fillText(watermarkText||"" , x,y)
        ctx.closePath();
      }
      let x = 0 ,
          y = 0;
      while(y < winHeight + between[1]){
        let cx = - Math.tan(radian) * y + x  + 10;
        createWatermark(cx,y);
        if (x < winWidth / Math.cos(radian) || x === 0) x += k + between[0];
        else {
          x = 0;
          y += between[1];
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.t-watermark-box{
  position: absolute;
  pointer-events: none;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .t-watermark{
    pointer-events: none;
    width: calc(100vw);
    height: calc(100vh);
    z-index: 1000;
  }
}
</style>
