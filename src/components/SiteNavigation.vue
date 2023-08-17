<template>
  <nav class="bg-blue-100 flex justify-between px-6 py-6 text-2xl">
    <div>
      <h1 class="text-3xl uppercase">Contacts</h1>
    </div>
    <div class="flex gap-4">
      <RouterLink :to="{ name: 'home' }">
        <div>
          <i class="fa-solid fa-house"></i>
        </div>
      </RouterLink>
      <RouterLink :to="{ name: 'favorites' }">
        <i class="fa-solid fa-heart"></i>
      </RouterLink>
      <RouterLink :to="{ name: 'addContact' }">
        <i class="fa-solid fa-plus"></i>
      </RouterLink>
      <input type="search" placeholder="Search" v-model="contactStore.query" />
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
