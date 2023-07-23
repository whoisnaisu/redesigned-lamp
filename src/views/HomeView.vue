<template>
  <div class="home">
    <book-shelf />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BookShelf from '@/components/BookShelf.vue';

@Component({
  components: {
    BookShelf
  },
})
export default class HomeView extends Vue {}
</script>
