<template>
  <div class="px-6">
    <p class="text-2xl py-4">Favorite Contacts ({{ favCount }})</p>
    <div v-for="contact in favs" class="max-w-lg">
      <ContactDetails :contact="contact" />
    </div>
  </div>

  <!-- BLANK STATE -->
  <div v-if="favCount === 0">
    <BlankState> No Favorites </BlankState>
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
