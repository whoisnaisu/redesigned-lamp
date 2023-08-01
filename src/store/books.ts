import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { $axios } from "@/utils/axios-instance";
import { store } from "./index";
import { IBookResp, IAds } from "@/interfaces/IBook";
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
  private booksData: Array<IBookResp | IAds> = [];
  private book: IBookResp = {} as IBookResp;
  private readonly GOOGLE_API: string = `https://www.googleapis.com/books/v1/volumes`;

  @Mutation
  setBooksData(data: Array<IBookResp>) {
    this.booksData = data;
  }

  @Mutation
  setBook(data: IBookResp) {
    this.book = data;
  }

  @Action
  async fetchBooks(payload: IBookPayload) {
    const { searchText, filter, order } = payload;
    if (!searchText) return;
    try {
      let api = `${this.GOOGLE_API}?q=${searchText}&orderBy=${order}&maxResults=12`;
      if (filter) {
        api += `&filter=${filter}`;
      }
      const { data } = await $axios.get(api);
      this.setBooksData(data.items);
      console.log(data.items);
    } catch (err) {
      logError(`fetchBooks at ${this.constructor.name}`, err);
    }
  }

  @Action
  async fetchBookById(id: string) {
    if (!id) return;
    try {
      const { data } = await $axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      console.log(data);
      this.setBook(data);
    } catch (err) {
      logError(`fetchBookById at ${this.constructor.name}`, err);
    }
  }

  @Action
  setBookById(payload: IBookResp) {
    this.setBook(payload);
  }

  get getBooksData() {
    return this.booksData;
  }

  get getBookById() {
    return this.book;
  }
}
