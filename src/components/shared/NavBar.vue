<template>
  <header class="site-header">
    <nav class="nav-shell" aria-label="Primary navigation">
      <button class="brand" type="button" @click="backToHome">
        <span class="brand-mark">B</span>
        <span><strong>Book Directory</strong><small>Your reading room</small></span>
      </button>
      <div class="nav-links">
        <router-link to="/">Explore</router-link>
        <router-link to="/fav">Saved <span class="saved-count">{{ favoriteCount }}</span></router-link>
      </div>
    </nav>
    <form v-if="$route.path === '/'" class="search-panel" @submit.prevent="searchBooks">
      <label class="search-field">
        <i class="bi bi-search" aria-hidden="true"></i>
        <input v-model="textSearch" type="search" placeholder="Search by title, author, ISBN, or subject" aria-label="Search books" />
      </label>
      <select v-model="selectedOrder" aria-label="Sort results">
        <option value="relevance">Most relevant</option>
        <option value="newest">Newest first</option>
      </select>
      <select v-model="selectedFilter" aria-label="Filter results">
        <option :value="null">All formats</option>
        <option value="ebooks">E-books</option>
        <option value="free-ebooks">Free e-books</option>
        <option value="paid-ebooks">Paid e-books</option>
        <option value="full">Full view</option>
        <option value="partial">Preview available</option>
      </select>
      <button class="primary-button" type="submit" :disabled="isLoading">
        {{ isLoading ? "Searching…" : "Search" }}
      </button>
    </form>
  </header>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator"

@Component
export default class NavBar extends Vue {
  textSearch = ""
  selectedFilter: string | null = null
  selectedOrder = "relevance"

  mounted() { this.searchBooks() }

  @Watch("selectedFilter") onFilterChanged() { this.searchBooks() }
  @Watch("selectedOrder") onOrderChanged() { this.searchBooks() }

  async searchBooks() {
    if (this.$route.path !== "/") this.$router.push("/")
    this.$status.setLoading()
    try {
      await this.$books.fetchBooks({ searchText: this.textSearch, filter: this.selectedFilter, order: this.selectedOrder })
      this.$status.clearStatus()
    } catch (error) {
      const errorText = String(error instanceof Error ? `${error.message} ${error.stack || ""}` : error)
      const message = errorText.includes("429")
        ? "Google Books rate limit reached. Add VUE_APP_GOOGLE_BOOKS_API_KEY to your .env.local file, then restart the app."
        : "Google Books is unavailable right now. Check your connection and try again."
      this.$status.setError(message)
      this.$logError("searching Google Books", error)
    }
  }

  get isLoading() { return this.$status.getIsLoading }
  get favoriteCount() { return this.$favs.getFavBookLists.length }
  backToHome() { if (this.$route.path !== "/") this.$router.push("/") }
}
</script>
