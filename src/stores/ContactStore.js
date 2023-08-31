import { defineStore } from "pinia";
import { supabase } from "../lib/supabaseClient";

export const useContactStore = defineStore("contactStore", {
  state: () => ({
    contacts: [],
    isLoading: false,
    query: ""
  }),

  getters: {
    favs() {
      //returns the contact if isFav is true
      return this.contacts.filter((c) => c.is_fav);
    },
    favCount() {
      return this.contacts.reduce((prev, cur) => {
        //if the current item isFav is true, return the previous value + 1, otherwise just return the previous value
        return cur.is_fav ? prev + 1 : prev;
      }, 0);
    },
    //if using an arrow fx like below, you cannot access the 'this' keyword.
    //instead have to take the state as an argument
    totalContactCount: (state) => {
      if (state.contacts.length != 0) {
        return state.contacts.length;
      }
    }
  },
  actions: {
    async getContacts() {
      this.isLoading = true;

      const { data } = await supabase.from("contacts").select("*");
      this.contacts = data;

      this.isLoading = false;
    },
    async addContact(contact) {
      this.isLoading = true;

      const { data, error } = await supabase
        .from("contacts")
        .insert([
          {
            first_name: `${contact.firstName}`,
            last_name: `${contact.lastName}`,
            email: `${contact.email}`,
            phone_number: `${contact.phoneNumber}`
          }
        ])
        .select();

      if (error) {
        console.log(error);
        return;
      }

      this.contacts.push(contact);

      this.isLoading = false;

      return contact;
    },
    async deleteContact(id) {
      this.isLoading = true;

      const { error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", `${id}`);

      if (error) {
        console.log(error);
        return;
      }

      this.contacts = this.contacts.filter((c) => {
        return c.id !== id;
      });

      this.isLoading = false;
    },
    async toggleFav(id) {
      const contact = this.contacts.find((c) => c.id === id);
      const toggleFav = !contact.is_fav;

      const { data, error } = await supabase
        .from("contacts")
        .update({ is_fav: `${toggleFav}` })
        .eq("id", `${id}`)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      contact.is_fav = !contact.is_fav;
    },
    async updateContact(contactToUpdate) {
      this.contacts.find((c) => c.id === contactToUpdate.id);

      this.isLoading = true;
      const { data, error } = await supabase
        .from("contacts")
        .update(contactToUpdate)
        .eq("id", `${contactToUpdate.id}`)
        .select();

      if (error) {
        console.log(error);
        return;
      }

      this.isLoading = false;
    },
    async searchContacts() {
      this.isLoading = true;

      let { data, error } = await supabase
        .from("contacts")
        .select("*")
        .ilike("first_name", `%${this.query}%`);

      if (error) {
        console.log(error);
        return;
      }

      this.contacts = data;
      this.isLoading = false;
    }
  }
});
