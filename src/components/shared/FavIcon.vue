<template>
  <i
    class="bi bi-heart-fill"
    v-b-tooltip.hover.bottom
    title="Remove from favorite."
  ></i>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FavIcon extends Vue {}
</script>

<style lang="scss" scoped></style>
