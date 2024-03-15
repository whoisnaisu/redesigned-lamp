<template>
  <i
    v-b-tooltip.hover.bottom
    class="bi bi-heart-fill"
    title="Remove from favorite."
  ></i>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component
export default class FavIcon extends Vue {}
</script>
