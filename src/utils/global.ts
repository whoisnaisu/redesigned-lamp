import Vue from "vue";
import { BSpinner } from "bootstrap-vue";
import { getModule } from "vuex-module-decorators";
import BookStore from "@/store/books";
import FavsStore from "@/store/favs";
import StatusStore from "@/store/status";
import "@/assets/scss/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.prototype.$books = getModule(BookStore);
Vue.prototype.$favs = getModule(FavsStore);
Vue.prototype.$status = getModule(StatusStore);

Vue.component("b-spinner", BSpinner);
