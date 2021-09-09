import Vue from "vue";
import {
  Form,
  Button,
  Row,
  FormItem,
  Input,
  Col,
  Message,
  Notification,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  Submenu,
  MessageBox,
  Option,
  Select
} from "element-ui";
Vue.use(Form);
Vue.use(Button);
Vue.use(Row);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Col);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Option);
Vue.use(Select);
Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;
Vue.prototype.$confirm = MessageBox;
