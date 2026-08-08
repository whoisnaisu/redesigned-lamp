import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators"
import { store } from "./index"

declare module "vue/types/vue" { interface Vue { $status: StatusStore } }

@Module({ name: "status", store, dynamic: true, namespaced: true, stateFactory: true })
export default class StatusStore extends VuexModule {
  private isLoading = false
  private errorMessage = ""

  get getIsLoading() { return this.isLoading }
  get getIsError() { return Boolean(this.errorMessage) }
  get getErrorMessage() { return this.errorMessage }

  @Mutation updateLoading() { this.isLoading = true; this.errorMessage = "" }
  @Mutation updateError(message: string) { this.errorMessage = message; this.isLoading = false }
  @Mutation updateStatus() { this.isLoading = false; this.errorMessage = "" }

  @Action setLoading() { this.context.commit("updateLoading") }
  @Action setError(message = "Google Books could not be reached. Please try again.") { this.context.commit("updateError", message) }
  @Action clearStatus() { this.context.commit("updateStatus") }
}
