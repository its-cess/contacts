<template>
  <div class="fixed w-full bottom-36">
    <div
      class="bg-gray-500/50 max-w-xs mx-auto text-slate-900 text-xl font-semibold p-4 rounded-md tracking-wider"
    >
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>
