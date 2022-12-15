import {Autocomplete, Cascader, DatePicker, Input} from 'element-ui';
import BigDataSelect from './BigDataSelect/BigDataSelect';
import BigDataSelectItem from './BigDataSelect/BigDataSelectItem';
import Card from './Card/Card';
import Dialog from './Dialog/Dialog';
import Menu from './Menu/Menu';
import SubMenu from './Menu/SubMenu';
import MenuItem from './Menu/MenuItem';
import MenuItemGroup from './Menu/MenuItemGroup';
import addEnterEvent from './override/addEnterEvent';
import Button from './override/Button.js';
import Result from './Result/Result';
import TableTemplate from './Table/TableTemplate';
import Textarea from './Textarea/Textarea';
import Select from "./override/Select";
import HistoryDialog from "./HistoryDialog/HistoryDialog";
import HistoryToDialog from './HistoryDialog/HistoryToDialog'
addEnterEvent([Input, Select, Cascader, Autocomplete, DatePicker]);
const components = {
  install: function(vue) {
    vue.component('TableTemplate', TableTemplate);
    vue.component('t-menu', Menu);
    vue.component('t-menu-item', MenuItem);
    vue.component('t-submenu', SubMenu);
    vue.component('t-menu-item-group', MenuItemGroup);
    vue.component('t-big-data-select', BigDataSelect);
    vue.component('t-big-data-select-item', BigDataSelectItem);
    vue.component('t-card', Card);
    vue.component('t-textarea', Textarea);
    vue.component('t-result', Result);
    vue.component('el-dialog', Dialog);
    vue.component('el-button', Button);
    vue.component("el-select", Select);
    vue.component("h-dialog", HistoryDialog);
    vue.component("l-history-dialog", HistoryToDialog);
  },
};
export default components;
