<template>
  <div class="page-shell">
    <section class="hero">
      <div>
        <p class="eyebrow">Powered by Google Books</p>
        <h1>A quieter way to find<br /><em>your next book.</em></h1>
        <p class="hero-copy">Search the world’s books, skim the essentials, and keep a personal shelf—all without the clutter.</p>
      </div>
      <div class="hero-art" aria-hidden="true"><span>Read</span><span>Think</span><span>Keep</span></div>
    </section>

    <section class="results-section" aria-live="polite">
      <div class="section-heading">
        <div><p class="eyebrow">The collection</p><h2>{{ resultTitle }}</h2></div>
        <span v-if="!isLoading && !isError" class="result-count">{{ totalItems.toLocaleString() }} results</span>
      </div>

      <div v-if="isLoading" class="book-grid">
        <div v-for="index in 8" :key="index" class="book-card skeleton"><div class="cover-placeholder"></div><span></span><span></span></div>
      </div>
      <div v-else-if="isError" class="state-card error-state">
        <span class="state-icon">!</span><h2>The shelf could not load</h2><p>{{ errorMessage }}</p>
      </div>
      <div v-else-if="!bookLists.length" class="state-card"><span class="state-icon">?</span><h2>No books found</h2><p>Try a broader title, author, or subject.</p></div>
      <div v-else class="book-grid">
        <article v-for="book in bookLists" :key="book.id" class="book-card" @click="showDetail(book)">
          <div class="cover-wrap">
            <img v-if="coverFor(book)" :src="coverFor(book)" :alt="`${book.volumeInfo?.title || 'Book'} cover`" @error="markCoverFailed(book.id)" />
            <div v-else class="cover-fallback"><span>{{ initials(book) }}</span></div>
            <button class="save-button" type="button" :aria-label="isFavorite[book.id] ? 'Remove from saved' : 'Save book'" @click.stop="toggleFav(book)">
              <i :class="isFavorite[book.id] ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'"></i>
            </button>
          </div>
          <div class="book-copy"><p class="book-kicker">{{ book.volumeInfo?.publishedDate || 'Publication date unknown' }}</p><h3>{{ book.volumeInfo?.title || 'Untitled' }}</h3><p>{{ authors(book) }}</p></div>
        </article>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { IBookResp } from "@/interfaces/IBook"

@Component
export default class BookShelf extends Vue {
  failedCovers: Record<string, boolean> = {}
  beforeMount() { this.$favs.initializeFromLocalStorage() }
  get bookLists() { return this.$books.getBooksData }
  get totalItems() { return this.$books.getTotalItems }
  get isFavorite() { return this.$favs.getIsFav }
  get isLoading() { return this.$status.getIsLoading }
  get isError() { return this.$status.getIsError }
  get errorMessage() { return this.$status.getErrorMessage }
  get resultTitle() { return this.bookLists.length ? "Books worth opening" : "Browse the shelves" }
  toggleFav(book: IBookResp) { this.$favs.toggleFavorite(book) }
  authors(book: IBookResp) { return book.volumeInfo?.authors?.join(", ") || "Unknown author" }
  coverFor(book: IBookResp) {
    if (this.failedCovers[book.id]) return ""
    const url = book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.smallThumbnail || ""
    return url.replace(/^http:/, "https:")
  }
  markCoverFailed(id: string) { this.failedCovers = { ...this.failedCovers, [id]: true } }
  initials(book: IBookResp) { return (book.volumeInfo?.title || "B").split(/\s+/).slice(0, 2).map(word => word[0]).join("").toUpperCase() }
  showDetail(book: IBookResp) { this.$books.setBookById(book); this.$router.push(`/book/${book.id}`) }
}
</script>
