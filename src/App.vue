<template>
  <div id="app">
    <nav-bar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "@/components/shared/NavBar.vue";

@Component({
  components: {
    NavBar,
  },
})
export default class HomeView extends Vue {}
</script>

<style></style>
