<template>
  <div class="page-shell detail-page">
    <button class="back-button" type="button" @click="$router.back()"><i class="bi bi-arrow-left"></i> Back to collection</button>
    <div v-if="isLoading" class="state-card"><h2>Opening the book…</h2></div>
    <article v-else class="detail-card">
      <div class="detail-cover"><img v-if="cover" :src="cover" :alt="`${book.volumeInfo?.title || 'Book'} cover`" /><div v-else class="cover-fallback">{{ initials }}</div></div>
      <div class="detail-copy"><p class="eyebrow">{{ book.volumeInfo?.categories?.[0] || 'Book details' }}</p><h1>{{ book.volumeInfo?.title || 'Untitled' }}</h1><p class="detail-author">by {{ book.volumeInfo?.authors?.join(', ') || 'Unknown author' }}</p><div class="meta-row"><span>{{ book.volumeInfo?.publishedDate || 'Date unknown' }}</span><span>{{ book.volumeInfo?.pageCount ? `${book.volumeInfo.pageCount} pages` : 'Length unknown' }}</span><span v-if="book.volumeInfo?.averageRating">★ {{ book.volumeInfo.averageRating }}</span></div><div class="description" v-html="book.volumeInfo?.description || 'No description is available for this title.'"></div><a v-if="book.volumeInfo?.infoLink" class="primary-button" :href="book.volumeInfo.infoLink" target="_blank" rel="noopener">View on Google Books <i class="bi bi-arrow-up-right"></i></a></div>
    </article>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component export default class BookDetail extends Vue {
  async mounted() { if (!this.book?.volumeInfo?.title || this.book.id !== this.$route.params.id) { this.$status.setLoading(); try { await this.$books.fetchBookById(this.$route.params.id) } finally { this.$status.clearStatus() } } }
  get book() { return this.$books.getBookById }
  get isLoading() { return this.$status.getIsLoading }
  get cover() { return (this.book.volumeInfo?.imageLinks?.thumbnail || '').replace(/^http:/, 'https:') }
  get initials() { return (this.book.volumeInfo?.title || 'B').split(/\s+/).slice(0,2).map(word => word[0]).join('').toUpperCase() }
}
</script>
