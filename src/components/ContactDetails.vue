<template>
  <div class="border-black border-2">
    <div class="bg-blue-100 flex justify-end gap-3">
      <i
        class="fa-solid fa-heart cursor-pointer"
        :class="{ ['text-red-600']: contact.is_fav }"
        @click="contactStore.toggleFav(contact.id)"
      ></i>
      <i
        class="fa-solid fa-pencil cursor-pointer"
        @click="goToEditContact(contact)"
      ></i>
      <i class="fa-solid fa-trash cursor-pointer" @click="toggleModal"> </i>
    </div>
    <div class="flex gap-1">
      <h1>{{ contact.first_name }}</h1>
      <h1>{{ contact.last_name }}</h1>
    </div>
    <div>
      <p>{{ contact.phone_number }}</p>
      <p>{{ contact.email }}</p>
    </div>
  </div>

  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <div>
      <h1>Delete Contact?</h1>
      <p>
        Are you sure you want to delete {{ contact.first_name }}
        {{ contact.last_name }} from your contacts?
      </p>
      <p>
        This action cannot be undone and all information associated with this
        contact will be lost.
      </p>
      <button @click="toggleModal">Cancel</button>
      <button @click="handleDelete(contact)">Delete</button>
    </div>
  </BaseModal>
</template>

<script>
import { ref } from "vue";
import { useContactStore } from "../stores/ContactStore";
import BaseModal from "./BaseModal.vue";
import { useRouter } from "vue-router";

export default {
  props: ["contact"],
  emits: ["delete-toast"],
  components: { BaseModal },
  setup(props, { emit }) {
    const contactStore = useContactStore();
    const modalActive = ref(null);

    const toggleModal = () => {
      modalActive.value = !modalActive.value;
    };

    const handleDelete = (contact) => {
      try {
        contactStore.deleteContact(contact.id);
      } catch (err) {
        console.log(err);
      }
      modalActive.value = !modalActive.value;
      emit("delete-toast");
    };

    const showToast = ref(false);
    const message = ref("");

    const triggerToast = (messageToSend) => {
      message.value = messageToSend;
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };

    const router = useRouter();
    const goToEditContact = (contact) => {
      router.push({
        name: "editContact",
        params: { id: contact.id }
      });
    };

    return {
      contactStore,
      modalActive,
      toggleModal,
      handleDelete,
      showToast,
      message,
      triggerToast,
      goToEditContact
    };
  }
};
</script>
