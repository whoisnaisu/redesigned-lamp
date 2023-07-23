<template>
  <div class="container">
    <div v-if="$handleStatus.isLoading">
      <b-spinner></b-spinner>
    </div>
    <div class="book-shelf" v-else>
      <div v-for="book in bookLists" :key="book.id">
        <div class="book">
          <div @click="addFav(book)" class="heart-icon">
            <i v-if="!isFavorite[book.id]" class="bi bi-heart"></i>
            <i v-else class="bi bi-heart-fill"></i>
          </div>
          <div>
            <img :src="book.volumeInfo?.imageLinks?.thumbnail" alt="" />
          </div>
          <p class="book-title">{{ book?.volumeInfo?.title }}</p>
          <p class="book-title">
            {{ book?.volumeInfo?.authors?.[0] ?? "No authors info." }}
          </p>
          <div class="e-book" v-if="book.saleInfo.isEbook">E-BOOK</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IBookResp } from "@/interfaces/IBook";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BookShelf extends Vue {
  isFavorite = {};
  favBookLists: Array<IBookResp> = [];

  beforeMount() {
    this.$favs.initializeFromLocalStorage();
  }

  mounted() {
    // localStorage.clear();
    const favoritesFromLocalStorage = this.$favs.getIsFav;
    const favBooksFromLocalStorage = this.$favs.getFavBookLists;

    this.$handleStatus.clearStatus();
    if (favoritesFromLocalStorage) {
      this.isFavorite = favoritesFromLocalStorage;
    }
    if (favBooksFromLocalStorage) {
      this.favBookLists = favBooksFromLocalStorage;
    }
  }
  get bookLists() {
    return this.$books.getBooksData;
  }

  addFav(book: any) {
    this.$favs.toggleFavorite(book);
  }
}
</script>
