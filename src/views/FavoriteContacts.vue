<template>
  <div class="px-12 flex flex-col container">
    <p class="text-2xl py-4">Favorite Contacts ({{ favCount }})</p>
    <div class="md:flex md:flex-row md:gap-3 md:max-w-full flex-wrap">
      <div v-for="contact in favs">
        <ContactDetails :contact="contact" />
      </div>
    </div>
  </div>

  <!-- BLANK STATE -->
  <div v-if="favCount === 0" class="container py-7 text-center">
    <BlankState>
      <h1 class="text-3xl text-center mb-7">No Favorites</h1>
    </BlankState>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useContactStore } from "../stores/ContactStore";
import ContactDetails from "../components/ContactDetails.vue";
import BlankState from "../components/BlankState.vue";

export default {
  components: { ContactDetails, BlankState },

  setup() {
    const contactStore = useContactStore();

    const { favs, favCount } = storeToRefs(contactStore);

    return { contactStore, favs, favCount };
  }
};
</script>
