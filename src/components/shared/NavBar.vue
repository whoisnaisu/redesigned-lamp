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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {
  textSearch: string = "Vue";
  magnifyingGlass = require(`@/assets/images/loupe-svgrepo-com.svg`);

  mounted() {
    this.searchBooks();
  }

  async searchBooks() {
    this.$handleStatus.setLoading();
    try {
      this.$books.fetchBooks({ searchText: this.textSearch });
    } catch (err) {
      this.$logError(`searchBooks at ${this.constructor.name}`, err);
      this.$handleStatus.setError();
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: saturate(200%) blur(30px);
  padding: 2rem 6rem 2rem 6rem;
  width: 100%;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}

nav a {
  font-weight: bold;
  color: #ffffff;
}

nav a.router-link-exact-active {
  color: #575cbf;
}

.find-a-book {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

%round-common-styles {
  height: 3rem;
  border-radius: 3rem;
  border: 1px solid snow;
  transition: 0.5s;
  min-width: fit-content;
  padding: 0 1rem 0 1rem;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    border-color: rgba(148, 187, 233, 1);
  }

  &:focus {
    outline: none !important;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
}

.search-input {
  width: 20rem;
  padding-left: 2rem;
  @extend %round-common-styles;
}

.search-button {
  margin: 0 0 0 1rem;
  @extend %round-common-styles;
}

.magnify-glass {
  width: 5rem;
}

.f {
  animation: drop 2s ease 0s 1 normal backwards;
}

.i {
  animation: drop 2s ease-in-out 0.2s 1 normal backwards;
}

.n {
  animation: drop 2s ease-in-out 0.4s 1 normal backwards;
}

.d {
  animation: drop 2s ease-out 0.6s 1 normal backwards;
}

.a {
  animation: drop 2s linear 0.8s 1 normal backwards;
}

.b {
  animation: drop 1.5s linear 1s 1 normal backwards;
}

.o1 {
  animation: drop 1.5s linear 1.2s 1 normal backwards;
}

.o2 {
  animation: drop 1.5s linear 1.4s 1 normal backwards;
}

.k {
  animation: drop 1.5s linear 1.6s 1 normal backwards;
}
@keyframes drop {
  0% {
    animation-timing-function: ease-in;
    opacity: 1;
    transform: translateY(-13rem);
  }
  24% {
    opacity: 1;
  }
  40% {
    animation-timing-function: ease-in;
    transform: translateY(-24px);
  }
  65%,
  82%,
  93% {
    animation-timing-function: ease-in;
    transform: translateY(-12px);
  }
  55%,
  75%,
  87% {
    animation-timing-function: ease-out;
    transform: translateY(0px);
  }
  100% {
    animation-timing-function: ease-out;
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
