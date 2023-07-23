import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "@/utils/axios-instance";
import { store } from "./index";
import { IBookResp } from "@/interfaces/IBook";
import { IBookPayload } from "@/interfaces/IPayload";
import logError from "@/utils/log-error";

declare module "vue/types/vue" {
  interface Vue {
    $books: BookStore;
  }
}

@Module({
  name: "book",
  store,
  dynamic: true,
  namespaced: true,
  stateFactory: true,
})
export default class BookStore extends VuexModule {
  private booksData: Array<IBookResp> = [];

  @Mutation
  setBooksData(data: Array<IBookResp>) {
    this.booksData = data;
  }

  @Action
  async fetchBooks(payload: IBookPayload) {
    const { searchText } = payload;
    if (!searchText) return;
    try {
      const { data } = await $axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchText}`
      );
      this.setBooksData(data.items);
      // console.log(data.items);
    } catch (err) {
      logError(`fetchBooks at ${this.constructor.name}`, err);
    }
  }

  get getBooksData() {
    return this.booksData;
  }
}
