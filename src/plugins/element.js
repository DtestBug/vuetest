import Vue from 'vue'
import { Form, FormItem, Upload, Table, TableColumn, Dialog, Drawer, DatePicker, Alert, Pagination} from 'element-ui'
import { Input } from 'element-ui'
import { Button } from 'element-ui'

import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Upload)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Drawer)
Vue.use(DatePicker)
Vue.use(Alert)
Vue.use(Pagination)

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert;