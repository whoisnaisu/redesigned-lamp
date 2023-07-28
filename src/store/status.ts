import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { store } from "./index";

declare module "vue/types/vue" {
  interface Vue {
    $status: StatusStore;
  }
}

@Module({
  name: "status",
  store,
  dynamic: true,
  namespaced: true,
  stateFactory: true,
})
export default class StatusStore extends VuexModule {
  private isLoading: boolean = false;
  private isError: boolean = false;

  get getIsLoading() {
    return this.isLoading;
  }

  get getIsError() {
    return this.isError;
  }

  @Mutation
  updateLoading() {
    this.isLoading = true;
    this.isError = false;
  }

  @Mutation
  updateEror() {
    this.isError = true;
    this.isLoading = false;
  }

  @Mutation
  updateStatus() {
    this.isLoading = false;
    this.isError = false;
  }

  @Action
  setLoading() {
    this.updateLoading();
  }

  @Action
  setError() {
    this.updateEror();
  }

  @Action
  clearStatus() {
    this.updateStatus();
  }
}
