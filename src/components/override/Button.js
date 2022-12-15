import { Button } from "element-ui";
import { debounce } from "@/utils/tools";
Button.props.debounce = {
  type: Boolean,
  default:()=>true
}
Button.beforeMount = function () {
  if (this.debounce) {
    this.handleClick = debounce((e) => {
      this.$emit("click", e);
    }, false, 500)
  } else {
    this.handleClick = (e) => {
      this.$emit("click", e);
    }
  }
}
export default Button;
