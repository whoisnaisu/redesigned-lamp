import Vue from "vue";
import { BSpinner } from "bootstrap-vue";
import { getModule } from "vuex-module-decorators";
import BookStore from "@/store/books";
import FavsStore from "@/store/favs";
import StatusStore from "@/store/status";
import "@/assets/scss/main.scss";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { BFormSelect } from "bootstrap-vue";
import { FormSelectPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import FavIcon from "@/components/shared/FavIcon.vue";
import UnFavIcon from "@/components/shared/UnFavIcon.vue";

Vue.prototype.$books = getModule(BookStore);
Vue.prototype.$favs = getModule(FavsStore);
Vue.prototype.$status = getModule(StatusStore);

Vue.component("b-spinner", BSpinner);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.component("b-form-select", BFormSelect);
Vue.use(FormSelectPlugin);
Vue.component("fav-icon", FavIcon);
Vue.component("un-fav-icon", UnFavIcon);
