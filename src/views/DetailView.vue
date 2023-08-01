<template>
  <div class="home">
    <book-detail />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BookDetail from "@/components/BookDetail.vue";

@Component({
  components: {
    BookDetail,
  },
})
export default class DetailView extends Vue {}
</script>
