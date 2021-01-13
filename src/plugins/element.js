import Vue from 'vue'
import { Form, FormItem, Upload, Table, TableColumn} from 'element-ui'
import { Input } from 'element-ui'
import { Button } from 'element-ui'
// 导入弹框提示组件
import{ Message } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message