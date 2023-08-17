<template>
  <div>
    <Suspense>
      <AsyncEditContact />
    </Suspense>
  </div>
</template>

<script setup>
import AsyncEditContact from "../components/AsyncEditContact.vue";
</script>
