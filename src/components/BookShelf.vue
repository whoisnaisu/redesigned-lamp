<template>
  <div class="container">
    <div v-if="isLoading">
      <b-spinner></b-spinner>
    </div>
    <div class="book-shelf" v-else>
      <div v-for="book in modifiedBookLists" :key="book.id">
        <div class="book">
          <div v-if="!book.isAds" @click="toggleFav(book)">
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
          <div v-if="!book.isAds">
            <p class="description">
              {{ book?.volumeInfo?.title }}
            </p>
          </div>

          <p class="description" v-if="!book.isAds">
            {{ book?.volumeInfo?.authors?.[0] ?? "No authors info." }}
          </p>
          <p v-else class="description">Advertisement.</p>
          <div class="e-book" v-if="book.saleInfo?.isEbook">E-BOOK</div>
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
  beforeMount() {
    this.$favs.initializeFromLocalStorage();
  }

  mounted() {
    this.$status.clearStatus();
  }

  toggleFav(book: IBookResp) {
    this.$favs.toggleFavorite(book);
  }

  get bookLists() {
    return this.$books.getBooksData;
  }

  get modifiedBookLists() {
    const originalBookLists = this.bookLists;
    const ads1 = {
      id: "ads1",
      isAds: true,
    };
    const ads2 = {
      id: "ads2",
      isAds: true,
    };
    const newBookLists = [...originalBookLists];
    const center = Math.floor(newBookLists.length / 2);
    newBookLists.splice(center, 0, ads1);
    newBookLists.push(ads2);
    return newBookLists;
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
