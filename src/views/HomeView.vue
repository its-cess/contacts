<template>
  <!-- LOADING STATE -->
  <div v-if="isLoading">
    <LoadingSpinner />
  </div>

  <!-- ALL CONTACTS -->
  <div class="px-12 flex flex-col container">
    <p class="text-2xl py-4">All Contacts ({{ totalContactCount }})</p>
    <div class="md:flex md:flex-row md:gap-3 md:max-w-full flex-wrap">
      <div v-for="contact in contacts">
        <ContactDetails
          :contact="contact"
          @delete-toast="triggerToast('Contact Deleted!')"
        />
      </div>
    </div>
  </div>

  <!-- BLANK STATE -->
  <div v-if="contacts.length === 0" class="container py-7 text-center">
    <BlankState>
      <h1 class="text-3xl text-center mb-7">No Contacts Yet</h1>
      <RouterLink
        :to="{ name: 'addContact' }"
        class="bg-sky-600 rounded-md p-3 text-xl text-white uppercase font-semibold shadow-button hover:brightness-75"
        >Add Contact</RouterLink
      >
    </BlankState>
  </div>

  <!-- TOAST NOTIFICATION -->
  <div v-if="showToast">
    <Toast :message="message" />
  </div>
</template>

<script>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink } from "vue-router";
import { useContactStore } from "../stores/ContactStore";
import ContactDetails from "../components/ContactDetails.vue";
import BlankState from "../components/BlankState.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import Toast from "../components/Toast.vue";

export default {
  //register components:
  components: { ContactDetails, BlankState, LoadingSpinner, Toast },
  setup() {
    //setup store to be able to use
    const contactStore = useContactStore();

    //fetch contacts
    const fetchContacts = async () => {
      await contactStore.getContacts();
    };

    fetchContacts();

    //creates refs from whatever you destructure out of the store.
    //always you to use them in the template without having to add contactStore before it
    //i.e. contactStore.favCount becomes just favCount
    const { contacts, isLoading, totalContactCount } =
      storeToRefs(contactStore);

    const showToast = ref(false);
    const message = ref("");

    const triggerToast = (messageToSend) => {
      message.value = messageToSend;
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };

    //return everything so we can use it in the template
    return {
      contactStore,
      contacts,
      isLoading,
      totalContactCount,
      showToast,
      message,
      triggerToast
    };
  }
};
</script>
