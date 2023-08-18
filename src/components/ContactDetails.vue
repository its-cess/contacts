<template>
  <div class="bg-white shadow-button rounded-md mb-6 w-[325px]">
    <div
      class="bg-sky-600 rounded-t-md p-3 flex justify-end gap-3 text-sky-800"
    >
      <i
        class="fa-solid fa-heart"
        :class="{ ['text-rose-400']: contact.is_fav }"
        @click="contactStore.toggleFav(contact.id)"
      ></i>
      <i class="fa-solid fa-pencil" @click="goToEditContact(contact)"></i>
      <i class="fa-solid fa-trash" @click="toggleModal"> </i>
    </div>

    <div class="flex flex-row gap-1 font-black text-2xl text-slate-700 p-5">
      <h1>
        {{ contact.first_name }}
      </h1>
      <h1>
        {{ contact.last_name }}
      </h1>
    </div>

    <div class="pb-5 px-5 text-slate-600 font-semibold">
      <p>{{ contact.phone_number }}</p>
      <p>{{ contact.email }}</p>
    </div>
  </div>

  <!-- CONFIRM DELETE MODAL -->
  <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
    <div class="p-3">
      <h1 class="text-2xl text-slate-700 font-black mb-3 -mt-3">
        Delete Contact?
      </h1>
      <p class="modal-p">
        Are you sure you want to delete
        <span class="font-semibold text-red-700"
          >{{ contact.first_name }} {{ contact.last_name }}</span
        >
        from your contacts?
      </p>
      <p class="modal-p">
        This action cannot be undone and all information associated with this
        contact will be lost.
      </p>
      <div
        class="flex flex-col-reverse w-full gap-3 mb-3 mt-4 md:flex-row md:justify-end md:pr-12"
      >
        <button
          @click="toggleModal"
          class="bg-transparent border-2 border-slate-400 text-slate-400 p-2"
        >
          Cancel
        </button>
        <button
          @click="handleDelete(contact)"
          class="bg-red-700 rounded-md p-3 text-white"
        >
          Delete
        </button>
      </div>
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

<style scoped lang="postcss">
i {
  @apply text-xl px-1 cursor-pointer hover:brightness-75;
}

.modal-p {
  @apply text-xl mb-3;
}

button {
  @apply rounded-md text-xl uppercase font-semibold shadow-button hover:brightness-75 tracking-wider md:px-7;
}
</style>
