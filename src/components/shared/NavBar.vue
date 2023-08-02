<template>
  <nav>
    <div class="logo-container" @click="backToHome">
      <div
        class="magnify-glass"
        v-b-tooltip.hover.bottom
        title="Search any books!"
      >
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
    <div class="search-and-filter-container">
      <div class="input-container">
        <input
          class="search-input"
          type="text"
          placeholder="Search any books!"
          @keyup.enter="searchBooks"
          v-model="textSearch"
        />
        <span class="icon-right" @click="clearSearch">
          <i class="bi bi-x"></i>
        </span>
      </div>
      <button class="search-button" type="button" @click="searchBooks">
        Search
      </button>
      <div>
        <b-form-select
          class="drop-down"
          v-model="selectedOrder"
          :options="orderOptions"
        >
        </b-form-select>
      </div>
      <div>
        <b-form-select
          class="drop-down"
          v-model="selectedFilter"
          :options="filterOptions"
        ></b-form-select>
      </div>
    </div>
    <div>
      <router-link to="/" v-b-tooltip.hover.bottom title="Book list section.">
        <i class="bi bi-book"></i>
      </router-link>
      |
      <router-link
        to="/fav"
        v-b-tooltip.hover.bottom
        title="Favourite section."
      >
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

  showOrderSelect: boolean = false;
  showFilterSelect: boolean = false;

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

  clearSearch() {
    this.textSearch = "";
  }

  toggleFilterSelect() {
    this.showFilterSelect = !this.showFilterSelect;
  }

  toggleOrderSelect() {
    this.showOrderSelect = !this.showOrderSelect;
  }

  backToHome() {
    if (this.$route.path !== "/") {
      this.$router.push("/");
    }
  }
}
</script>

<style lang="scss" scoped></style>
