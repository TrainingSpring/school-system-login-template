import { debounce } from "../../utils/tools";

function addEvent  (item){
    item.props.isDebounce = {
        type: Boolean,
        default:()=>true
    }

    item.beforeMount =  function() {
        let handleFocus = this.handleFocus;
        this.handleFocus = e => {
            handleFocus(e);
            let el = e.target;
            el.onkeydown = (ev)=>{
                if (ev.keyCode === 13){
                    ev.stopPropagation();
                    this.handleEnter(ev);
                }
            }
        }
        if (this.isDebounce) {
            this.handleEnter = debounce((event)=>{
                this.$emit("enter",event);
            },false,500)
        } else {
            this.handleEnter = (event)=>{
                this.$emit("enter",event);
            }
        }
    }
}

function addEnterEvent(Components = []){
    if (!Array.isArray(Components))return addEvent(Components)
    Components.forEach(item=>{
        addEvent(item)
    })

    return Components;
}
export default addEnterEvent;
