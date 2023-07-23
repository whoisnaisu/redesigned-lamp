<template>
  <div class="fav">
    <fav-book-shelf />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FavBookShelf from "@/components/FavBookShelf.vue";

@Component({
  components: {
    FavBookShelf,
  },
})
export default class FavView extends Vue {}
</script>
