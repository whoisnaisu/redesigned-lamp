import Vue from "vue";
import { BSpinner } from "bootstrap-vue";
import { getModule } from "vuex-module-decorators";
import BookStore from "@/store/books";
import FavsStore from "@/store/favs";
import "@/assets/scss/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import HandleStatus from "@/utils/handle-status";

Vue.prototype.$books = getModule(BookStore);
Vue.prototype.$favs = getModule(FavsStore);
Vue.prototype.$handleStatus = HandleStatus.getInstance();
Vue.component("b-spinner", BSpinner);
