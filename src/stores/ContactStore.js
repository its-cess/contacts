import { defineStore } from "pinia";

export const useContactStore = defineStore("contactStore", {
  state: () => ({
    contacts: [],
    isLoading: false,
    query: ""
  }),

  getters: {
    favs() {
      //returns the contact if isFav is true
      return this.contacts.filter((c) => c.isFav);
    },
    favCount() {
      return this.contacts.reduce((prev, cur) => {
        //if the current item isFav is true, return the previous value + 1, otherwise just return the previous value
        return cur.isFav ? prev + 1 : prev;
      }, 0);
    },
    //if using an arrow fx like below, you cannot access the 'this' keyword.
    //instead have to take the state as an argument
    totalContactCount: (state) => {
      return state.contacts.length;
    }
  },
  actions: {
    async getContacts() {
      this.isLoading = true;

      const res = await fetch("http://localhost:3000/contacts");
      const data = await res.json();
      this.contacts = data;

      this.isLoading = false;
    },
    async addContact(contact) {
      this.contacts.push(contact);

      this.isLoading = true;
      const res = await fetch("http://localhost:3000/contacts", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" }
      });

      if (res.error) {
        console.log(res.error);
      }

      this.isLoading = false;
    },
    async deleteContact(id) {
      this.contacts = this.contacts.filter((c) => {
        return c.id !== id;
      });

      this.isLoading = true;
      const res = await fetch("http://localhost:3000/contacts/" + id, {
        method: "DELETE"
      });

      if (res.error) {
        console.log(res.error);
      }

      this.isLoading = false;
    },
    async toggleFav(id) {
      const contact = this.contacts.find((c) => c.id === id);
      contact.isFav = !contact.isFav;

      this.isLoading = true;
      const res = await fetch("http://localhost:3000/contacts/" + id, {
        method: "PATCH",
        body: JSON.stringify({ isFav: contact.isFav }),
        headers: { "Content-Type": "application/json" }
      });

      if (res.error) {
        console.log(res.error);
      }

      this.isLoading = false;
    },
    async searchContacts() {
      this.isLoading = true;

      const res = await fetch("http://localhost:3000/contacts?q=" + this.query);
      const data = await res.json();
      this.contacts = data;

      this.isLoading = false;
    },
    async updateContact(contactToUpdate) {
      this.contacts.find((c) => c.id === contactToUpdate.id);

      this.isLoading = true;
      const res = await fetch(
        "http://localhost:3000/contacts/" + contactToUpdate.id,
        {
          method: "PATCH",
          body: JSON.stringify(contactToUpdate),
          headers: { "Content-Type": "application/json" }
        }
      );

      if (res.error) {
        console.log(res.error);
      }

      this.isLoading = false;
    }
  }
});
