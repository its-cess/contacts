<template>
  <nav
    class="bg-blue-50 flex flex-col md:flex-row md:items-center p-7 w-full text-2xl"
  >
    <div class="flex justify-between md:flex-row w-full">
      <div>
        <h1 class="text-3xl uppercase font-semibold text-slate-700">
          Contacts
        </h1>
      </div>
      <div class="flex gap-4 md:flex-row md:ml-auto">
        <RouterLink :to="{ name: 'home' }">
          <i class="fa-solid fa-house"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'favorites' }">
          <i class="fa-solid fa-heart"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'addContact' }">
          <i class="fa-solid fa-plus"></i>
        </RouterLink>
      </div>
    </div>
    <div class="pt-4 text-white md:pt-0 md:pl-4">
      <input
        type="search"
        placeholder="Search"
        v-model="contactStore.query"
        class="w-full rounded-full indent-4 caret-slate-700 text-xl py-2 bg-slate-400"
      />
    </div>
  </nav>
</template>

<script>
import { watchEffect } from "vue";
import { RouterLink } from "vue-router";
import { useContactStore } from "../stores/ContactStore";

export default {
  setup() {
    const contactStore = useContactStore();

    watchEffect(() => {
      contactStore.searchContacts(contactStore.query);
    });

    return { contactStore };
  }
};
</script>

<style scoped lang="postcss">
i {
  @apply text-slate-700 hover:text-slate-400 hover:cursor-pointer;
}

input[type="search"]:focus {
  @apply outline-none border-2 border-slate-700;
}

::placeholder {
  @apply text-slate-700;
}
</style>
