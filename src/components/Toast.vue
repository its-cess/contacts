<template>
  <div class="fixed w-full bottom-36">
    <div class="bg-slate-500 max-w-md mx-auto">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>
