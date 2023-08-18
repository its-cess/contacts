<template>
  <div class="max-w-lg m-4 container mx-auto">
    <h1
      class="text-3xl pt-4 text-slate-700 font-semibold border-b-4 border-sky-600"
    >
      Update Contact
    </h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 mt-8">
      <div class="form-input">
        <label for="firstName">First Name</label>
        <input
          type="text"
          placeholder="John"
          id="firstName"
          name="firstName"
          :value="contactData.first_name"
          @input="editFirstName"
        />
      </div>
      <div class="form-input">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          id="lastName"
          name="lastName"
          :value="contactData.last_name"
          @input="editLastName"
        />
      </div>

      <div class="form-input">
        <label for="email">Email Address</label>
        <input
          type="email"
          placeholder="johndoe@email.com"
          id="email"
          name="email"
          :value="contactData.email"
          @input="editEmail"
        />
      </div>

      <div class="form-input">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          placeholder="(555) 111-2222"
          id="phoneNumber"
          name="phoneNumber"
          :value="contactData.phone_number"
          @input="editPhoneNumber"
          v-maska
          data-maska="(###) ###-####"
        />
      </div>
      <div class="flex flex-col gap-4 mt-4">
        <button class="btn bg-sky-600 text-white p-3">Update</button>
        <RouterLink
          :to="{ name: 'home' }"
          class="btn border-2 border-sky-600 bg-transparent text-sky-600 p-2"
          >Cancel</RouterLink
        >
      </div>
    </form>

    <!-- TOAST NOTIFICATION -->
    <div v-if="showToast">
      <Toast :message="message" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useContactStore } from "../stores/ContactStore";
import { supabase } from "../lib/supabaseClient";
import Toast from "./Toast.vue";

const route = useRoute();
const router = useRouter();
const contactStore = useContactStore();

const getContactData = async () => {
  let { data, error } = await supabase
    .from("contacts")
    .select()
    .eq("id", `${route.params.id}`);

  if (error) {
    console.log(error);
    return;
  }

  let contactData = data[0];
  return contactData;
};

const contactData = await getContactData();

const editFirstName = (event) => {
  contactData.first_name = event.target.value;
};

const editLastName = (event) => {
  contactData.last_name = event.target.value;
};

const editEmail = (event) => {
  contactData.email = event.target.value;
};

const editPhoneNumber = (event) => {
  contactData.phone_number = event.target.value;
};

const showToast = ref(false);
const message = ref("");

const triggerToast = (messageToSend) => {
  message.value = messageToSend;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 3000);
};

const handleSubmit = () => {
  try {
    contactStore.updateContact({
      id: contactData.id,
      first_name: contactData.first_name,
      last_name: contactData.last_name,
      email: contactData.email,
      phone_number: contactData.phone_number
    });
  } catch (err) {
    console.log(err);
  }

  triggerToast("Contact Updated!");

  setTimeout(() => {
    router.push("/");
  }, 500);
};
</script>

<style scoped lang="postcss">
label {
  @apply uppercase text-xs text-slate-400 font-semibold tracking-wider;
}

.form-input {
  @apply flex flex-col;
}

input {
  @apply indent-1 caret-slate-700 text-lg py-2 rounded-sm;
}

input:focus {
  @apply outline-none border-2 border-sky-600;
}

::placeholder {
  @apply text-slate-200;
}

.btn {
  @apply rounded-md uppercase text-xl tracking-wider text-center font-semibold shadow-button hover:brightness-75;
}
</style>
