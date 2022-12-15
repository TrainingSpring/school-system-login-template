import {utils} from "@/utils/utils";
import config from "../router/config";


/**
 * @description DFS 遍历后台返回的数据节点
 * @param node
 * @return {[]}
 */
function DFSServerConfig(node) {
    let names = [];
    if (node != null) {
        let stack = [];
        for (let i = node.length-1;i>=0;i--)stack.push(node[i]);
        while (stack.length !== 0) {
            let item = stack.pop();
            let title = item.name;
            names.push(title);
            let child = item.child||[];
            for (let i = child.length - 1; i >= 0; i--)
                stack.push(child[i]);
        }
    }
    return names;
}

/**
 * @description DFS遍历路由树
 * @param node
 * @return {{}}
 * @constructor
 */
function DFSRouter(node){
    let names = {};
    if (node != null) {
        let stack = [];
        for (let i = node.length-1;i>=0;i--)stack.push(node[i]);
        while (stack.length !== 0) {
            let item = stack.pop();

            let title = item.meta.title;
            let children = item.children;
            if (children)names[title] = item.path;
            else children = [];
            for (let i = children.length - 1; i >= 0; i--)
                stack.push(children[i]);
        }
    }
    return names;
}

export default {
    analyseRouter(context){
        return utils.loginApi.getMenu().then(res=>{
            let {error,data} = res.data;
            if (error.errorCode === 0){
                let menuConfig = DFSServerConfig(data);
                let routerMap = DFSRouter(config);
                context.commit("setMenuConfig",data);
                context.commit("setMenuNames",menuConfig);
                context.commit("setRouterMap",routerMap);
                context.commit("setRightMenuIndex",-1)
                return {error, data};
            }else{
              throw error;
            }
        })
    },
    actionRightMenuIndex(context,payload){

        context.commit("setRightMenuIndex",payload);
    }
}
