<template>
  <div class="max-w-lg m-4">
    <h1
      class="text-3xl pt-4 text-slate-700 font-semibold border-b-4 border-sky-600"
    >
      Create New Contact
    </h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 mt-8">
      <div class="form-input">
        <label for="firstName">First Name</label>
        <input
          type="text"
          placeholder="John"
          id="firstName"
          v-model="firstName"
          required
        />
      </div>
      <div class="form-input">
        <label for="lastName">Last Name</label>
        <input type="text" placeholder="Doe" id="lastName" v-model="lastName" />
      </div>

      <div class="form-input">
        <label for="email">Email Address</label>
        <input
          type="email"
          placeholder="johndoe@email.com"
          id="email"
          v-model="email"
        />
      </div>

      <div class="form-input">
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          placeholder="(555) 111-2222"
          id="phoneNumber"
          v-model="phoneNumber"
          v-maska
          data-maska="(###) ###-####"
        />
      </div>
      <div class="flex flex-col gap-4 mt-4">
        <button class="btn bg-sky-600 text-white p-3">Add Contact</button>
        <RouterLink
          :to="{ name: 'home' }"
          class="btn border-2 border-sky-600 bg-transparent text-sky-600 p-2"
          >Cancel</RouterLink
        >
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useContactStore } from "../stores/ContactStore";
import { useRouter, RouterLink } from "vue-router";

export default {
  setup() {
    const contactStore = useContactStore();
    const router = useRouter();

    const firstName = ref("");
    const lastName = ref("");
    const email = ref("");
    const phoneNumber = ref("");

    const handleSubmit = () => {
      try {
        contactStore.addContact({
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          isFav: false
        });
      } catch (err) {
        console.log(err);
      }

      firstName.value = "";
      lastName.value = "";
      email.value = "";
      phoneNumber.value = "";

      contactStore.getContacts();
      router.push("/");
    };

    return { handleSubmit, firstName, lastName, email, phoneNumber };
  }
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
