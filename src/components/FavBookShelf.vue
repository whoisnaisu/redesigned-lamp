<template>
  <div class="container">
    <div v-if="isLoading">
      <b-spinner></b-spinner>
    </div>
    <div class="book-shelf" v-else>
      <div v-for="book in favBookLists" :key="book.id">
        <div class="book">
          <div @click="toggleFav(book)" class="heart-icon">
            <div class="action-container">
              <un-fav-icon v-if="!isFavorite[book.id]" />
              <fav-icon v-else />
              <div class="detail-icon" ref="detail" @click="showDetail(book)">
                <i
                  class="bi bi-search"
                  v-b-tooltip.hover.bottom
                  title=" See the detail."
                ></i>
              </div>
            </div>
          </div>
          <div>
            <img :src="book.volumeInfo?.imageLinks?.thumbnail" alt="" />
          </div>
          <p class="description">
            {{ book?.volumeInfo?.title }}
          </p>
          <p class="description">
            {{ book?.volumeInfo?.authors?.[0] ?? "No authors info." }}
          </p>

          <div class="e-book" v-if="book.saleInfo?.isEbook">E-BOOK</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IBookResp } from "@/interfaces/IBook";

@Component({
  components: {},
})
export default class FavBookShelf extends Vue {
  beforeMount() {
    this.$favs.initializeFromLocalStorage();
  }

  mounted() {
    this.$status.clearStatus();
  }

  toggleFav(book: IBookResp) {
    this.$favs.toggleFavorite(book);
  }

  get isFavorite() {
    return this.$favs.getIsFav;
  }

  get favBookLists() {
    return this.$favs.getFavBookLists;
  }

  get isLoading() {
    return this.$status.getIsLoading;
  }

  showDetail(book: IBookResp) {
    this.$books.setBookById(book);
    this.$router.push(`/book/${book.id}`);
  }
}
</script>
