<template>
  <i class="bi bi-heart" v-b-tooltip.hover.bottom title="Add to favorite."></i>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FavIcon extends Vue {}
</script>

<style lang="scss" scoped></style>
