import Vue from "vue";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import { store } from "./index";
import { IBookResp } from "@/interfaces/IBook";

declare module "vue/types/vue" {
  interface Vue {
    $favs: FavsStore;
  }
}

@Module({
  name: "favs",
  store,
  dynamic: true,
  namespaced: true,
  stateFactory: true,
})
export default class FavsStore extends VuexModule {
  private favBookLists: Array<IBookResp> = [];
  private isFavorite: Record<string, boolean> = {};

  @Mutation
  setFavorites(data: Record<string, boolean>) {
    this.isFavorite = data;
  }

  @Mutation
  setFavBookLists(data: Array<IBookResp>) {
    this.favBookLists = data;
  }

  @Action
  initializeFromLocalStorage() {
    const favoritesFromLocalStorage = localStorage.getItem("favorites");
    const favBooksFromLocalStorage = localStorage.getItem("fav-books");
    if (favoritesFromLocalStorage) {
      this.setFavorites(JSON.parse(favoritesFromLocalStorage));
    }
    if (favBooksFromLocalStorage) {
      this.setFavBookLists(JSON.parse(favBooksFromLocalStorage));
    }
  }

  @Action
  toggleFavorite(book: any) {
    const id = book.id;
    const isFav = this.isFavorite[id];
    Vue.set(this.isFavorite, id, !isFav);
    if (!isFav) {
      this.removeFavoriteFromList(id);
    } else {
      this.addToFavoriteList(book);
    }

    this.saveFavoritesToLocalStorage();
  }

  @Action
  saveFavoritesToLocalStorage() {
    localStorage.setItem("favorites", JSON.stringify(this.isFavorite));
    localStorage.setItem("fav-books", JSON.stringify(this.favBookLists));
  }

  @Mutation
  addToFavoriteList(book: any) {
    this.favBookLists.push(book);
  }

  @Mutation
  removeFavoriteFromList(id: string) {
    this.favBookLists = this.favBookLists.filter((book) => book.id !== id);
  }

  get getFavBookLists() {
    return this.favBookLists;
  }

  get getIsFav() {
    return this.isFavorite;
  }
}
