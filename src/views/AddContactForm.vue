<template>
  <div class="m-6 px-6 py-2 bg-slate-400 max-w-lg">
    <h1>Create New Contact</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div>
        <label for="firstName">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          v-model="firstName"
          required
        />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          v-model="lastName"
        />
      </div>

      <div>
        <label for="email">Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          v-model="email"
        />
      </div>

      <div>
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          id="phoneNumber"
          v-model="phoneNumber"
          v-maska
          data-maska="(###) ###-####"
        />
      </div>
      <button class="border-2 border-slate-800 bg-slate-200">
        Add Contact
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useContactStore } from "../stores/ContactStore";
import { useRouter } from "vue-router";
import { uid } from "uid";

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
          id: uid(),
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
