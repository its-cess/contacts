<template>
  <div class="m-6 px-6 py-2 bg-slate-400 max-w-lg">
    <h1>Update Contact Information</h1>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <div>
        <label for="firstName">First Name</label>
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          name="firstName"
          :value="contactData.firstName"
          @input="editFirstName"
        />
      </div>
      <div>
        <label for="lastName">Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          :value="contactData.lastName"
          @input="editLastName"
        />
      </div>

      <div>
        <label for="email">Email Address</label>
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          name="email"
          :value="contactData.email"
          @input="editEmail"
        />
      </div>

      <div>
        <label for="phoneNumber">Phone Number</label>
        <input
          type="text"
          placeholder="Phone Number"
          id="phoneNumber"
          name="phoneNumber"
          :value="contactData.phoneNumber"
          @input="editPhoneNumber"
          v-maska
          data-maska="(###) ###-####"
        />
      </div>
      <button class="border-2 border-slate-800 bg-slate-200">
        Update Contact
      </button>
    </form>

    <!-- TOAST NOTIFICATION -->
    <div v-if="showToast">
      <Toast :message="message" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useContactStore } from "../stores/ContactStore";
import Toast from "./Toast.vue";

const route = useRoute();
const router = useRouter();
const contactStore = useContactStore();

const getContactData = async () => {
  try {
    const res = await fetch(
      `http://localhost:3000/contacts/${route.params.id}`
    );
    const contactData = await res.json();
    return contactData;
  } catch (err) {
    console.log(err);
  }
};

const contactData = await getContactData();

const editFirstName = (event) => {
  contactData.firstName = event.target.value;
};

const editLastName = (event) => {
  contactData.LastName = event.target.value;
};

const editEmail = (event) => {
  contactData.email = event.target.value;
};

const editPhoneNumber = (event) => {
  contactData.phoneNumber = event.target.value;
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
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phoneNumber: contactData.phoneNumber
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
