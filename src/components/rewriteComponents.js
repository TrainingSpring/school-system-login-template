import ElementUI from "element-ui";
const Message = ElementUI.Message;
const Table = ElementUI.Table;
Table.props.stripe = {
    type:Boolean,
    default(){
        return true;
    }
}
export const table = Table;
/**
 * @desc 重写message 设置默认参数
 * @param options
 * @return {ElMessageComponent}
 */
export function message (options) {
    options = {
        duration: 1000,
        ...options
    }
    return Message(options);
}
//重写一遍success的方法,将offset写入options
["success", "warning", "info", "error"].forEach((type) => {
    message[type] = (options) => {
        if (typeof options === "string") {
            options = {
                message: options,
                duration:1000
            };
        }else{
            options = {
                duration:1000,
                ...options
            }
        }
        options.type = type;
        return Message(options);
    };
});
