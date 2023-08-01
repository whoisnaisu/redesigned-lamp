<template>
  <div class="container">
    {{ bookId }}
    {{ book }}
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BookDetail extends Vue {
  beforeMount() {}

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
