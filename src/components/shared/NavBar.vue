<template>
  <nav>
    <div>
      <div class="magnify-glass">
        <img :src="magnifyingGlass" alt="" />
      </div>
      <div class="find-a-book">
        <div class="f">F</div>
        <div class="i">i</div>
        <div class="n">n</div>
        <div class="d">d</div>
        <div class="a">&nbsp;a&nbsp;</div>
        <div class="b">B</div>
        <div class="o1">o</div>
        <div class="o2">o</div>
        <div class="k">k</div>
      </div>
    </div>
    <div>
      <b-form-select v-model="selectedOrder" :options="orderOptions">
      </b-form-select>
      <b-form-select v-model="selectedFilter" :options="filterOptions">
      </b-form-select>
      <input
        class="search-input"
        type="text"
        placeholder="Search any books!"
        @keyup.enter="searchBooks"
        v-model="textSearch"
      />
      <button class="search-button" type="button" @click="searchBooks">
        Search
      </button>
    </div>
    <div>
      <router-link to="/">
        <i class="bi bi-book"></i>
      </router-link>
      |
      <router-link to="/fav">
        <i class="bi bi-heart-fill"></i>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  textSearch: string = "Vue";
  selectFilter: string = "full";
  magnifyingGlass = require(`@/assets/images/loupe-svgrepo-com.svg`);
  selectedFilter = null;
  filterOptions = [
    { value: null, text: "Filter" },
    { value: "free-ebooks", text: "Free E-Books" },
    { value: "paid-ebooks", text: "Paid E-Books" },
    { value: "ebooks", text: "E-Books" },
    { value: "full", text: "Free Books" },
    { value: "partial ", text: "Paid Books" },
  ];
  selectedOrder = "relevance";
  orderOptions = [
    { value: "relevance", text: "Sort By" },
    { value: "newest", text: "Newest" },
  ];

  mounted() {
    this.searchBooks();
  }

  @Watch("selectedFilter")
  async updateFilter(newVal: string) {
    if (newVal) {
      await this.searchBooks();
    }
  }

  @Watch("selectedOrder")
  async updateOrder(newVal: string) {
    if (newVal) {
      await this.searchBooks();
    }
  }

  async searchBooks() {
    this.$status.setLoading();
    try {
      this.$books.fetchBooks({
        searchText: this.textSearch,
        filter: this.selectedFilter,
        order: this.selectedOrder,
      });
      this.$status.clearStatus();
    } catch (err) {
      this.$logError(`searchBooks at ${this.constructor.name}`, err);
      this.$status.setError();
    }
  }

  get isLoading() {
    return this.$status.getIsLoading;
  }
}
</script>

<style lang="scss" scoped></style>
