<template>
  <div class="detail-container">
    <div class="detail-card">
      <div class="book-detail-left">
        <div class="detail-img">
          <img :src="book.volumeInfo?.imageLinks?.thumbnail" alt="" />
        </div>
      </div>
      <div class="book-detail-right">
        <div>
          <h1>Book Detail <i class="bi-zoom-in"></i></h1>
          <br />
        </div>
        <p><strong>Title:</strong> {{ book?.volumeInfo?.title }}</p>
        <p v-if="!book.isAds">
          <strong>Author:</strong>
          {{ book?.volumeInfo?.authors?.[0] ?? "No authors info." }}
        </p>
        <p>
          <strong>Published date:</strong> {{ book.volumeInfo?.publishedDate }}
        </p>
        <p style="text-decoration: underline"><strong>Description</strong></p>
        <p class="book-detail-desc" v-html="book.volumeInfo?.description"></p>
        <p><strong>pageCount:</strong> {{ book.volumeInfo?.pageCount }}</p>
        <p>
          <strong style="text-decoration: underline"
            >Industry Identifiers</strong
          >
          <br />
          <span v-for="item in book.volumeInfo?.industryIdentifiers">
            {{ item.type }}
            {{ item.identifier }}
          </span>
        </p>
        <p>
          <strong>Link:</strong>
          <a :href="book.selfLink"> {{ book.selfLink }}</a>
        </p>
        <div class="e-book" v-if="book.saleInfo?.isEbook">E-BOOK</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BookDetail extends Vue {
  mounted() {
    if (!this.book?.volumeInfo?.title) {
      this.fetchBook();
    }
  }

  async fetchBook() {
    try {
      this.$books.fetchBookById(this.bookId);
    } catch (err) {
      this.$logError(`fetchBook`, err);
    }
  }

  get bookId() {
    return this.$route.params.id;
  }

  get book() {
    return this.$books.getBookById;
  }
}
</script>

<style lang="scss" scoped></style>
