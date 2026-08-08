import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators"
import { store } from "./index"
import { $axios } from "@/utils/axios-instance"
import type { IBookResp } from "@/interfaces/IBook"
import type { IBookPayload } from "@/interfaces/IPayload"

declare module "vue/types/vue" {
  interface Vue { $books: BookStore }
}

@Module({ name: "book", store, dynamic: true, namespaced: true, stateFactory: true })
export default class BookStore extends VuexModule {
  private booksData: IBookResp[] = []
  private book: IBookResp = {} as IBookResp
  private totalItems = 0
  private readonly GOOGLE_API = "https://www.googleapis.com/books/v1/volumes"

  @Mutation setBooksData(data: IBookResp[]) { this.booksData = data }
  @Mutation setBook(data: IBookResp) { this.book = data }
  @Mutation setTotalItems(value: number) { this.totalItems = value }

  @Action
  async fetchBooks(payload: IBookPayload) {
    const query = (payload.searchText || "").trim() || "subject:fiction"
    const params: Record<string, string | number> = {
      q: query,
      orderBy: payload.order || "relevance",
      maxResults: 24,
      printType: "books",
      projection: "lite"
    }
    if (payload.filter) params.filter = payload.filter
    if (process.env.VUE_APP_GOOGLE_BOOKS_API_KEY) {
      params.key = process.env.VUE_APP_GOOGLE_BOOKS_API_KEY
    }

    const { data } = await $axios.get(this.GOOGLE_API, { params })
    this.context.commit("setBooksData", Array.isArray(data?.items) ? data.items : [])
    this.context.commit("setTotalItems", Number(data?.totalItems) || 0)
  }

  @Action
  async fetchBookById(id: string) {
    if (!id) return
    const params = process.env.VUE_APP_GOOGLE_BOOKS_API_KEY
      ? { key: process.env.VUE_APP_GOOGLE_BOOKS_API_KEY }
      : undefined
    const { data } = await $axios.get(`${this.GOOGLE_API}/${encodeURIComponent(id)}`, { params })
    this.context.commit("setBook", data)
  }

  @Action setBookById(payload: IBookResp) { this.context.commit("setBook", payload) }

  get getBooksData() { return this.booksData }
  get getBookById() { return this.book }
  get getTotalItems() { return this.totalItems }
}
