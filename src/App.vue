<template>
  <div>
    <SiteNavigation />
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";

export default {
  components: { SiteNavigation }
};
</script>
