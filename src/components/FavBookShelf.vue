<template>
  <div class="page-shell saved-page">
    <div class="section-heading"><div><p class="eyebrow">Your collection</p><h1>Saved books</h1></div><span class="result-count">{{ favBookLists.length }} saved</span></div>
    <div v-if="!favBookLists.length" class="state-card"><span class="state-icon">♡</span><h2>Your shelf is empty</h2><p>Save books while exploring and they will appear here.</p><router-link class="primary-button" to="/">Explore books</router-link></div>
    <div v-else class="book-grid">
      <article v-for="book in favBookLists" :key="book.id" class="book-card" @click="showDetail(book)">
        <div class="cover-wrap"><img v-if="book.volumeInfo?.imageLinks?.thumbnail" :src="book.volumeInfo.imageLinks.thumbnail.replace(/^http:/, 'https:')" :alt="`${book.volumeInfo?.title || 'Book'} cover`" /><div v-else class="cover-fallback">B</div><button class="save-button" type="button" aria-label="Remove saved book" @click.stop="toggleFav(book)"><i class="bi bi-bookmark-fill"></i></button></div>
        <div class="book-copy"><p class="book-kicker">{{ book.volumeInfo?.publishedDate || 'Publication date unknown' }}</p><h3>{{ book.volumeInfo?.title || 'Untitled' }}</h3><p>{{ book.volumeInfo?.authors?.join(', ') || 'Unknown author' }}</p></div>
      </article>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { IBookResp } from "@/interfaces/IBook"
@Component export default class FavBookShelf extends Vue {
  beforeMount() { this.$favs.initializeFromLocalStorage() }
  get favBookLists() { return this.$favs.getFavBookLists }
  toggleFav(book: IBookResp) { this.$favs.toggleFavorite(book) }
  showDetail(book: IBookResp) { this.$books.setBookById(book); this.$router.push(`/book/${book.id}`) }
}
</script>
